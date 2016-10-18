# -*- coding: utf-8 -*-
"""
see also: http://marshmallow.readthedocs.io/en/latest/examples.html#quotes-api-flask-sqlalchemy
"""
from datetime import datetime
from flask import Flask, jsonify, request, make_response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask_httpauth import HTTPBasicAuth
from flask_cors import CORS
from marshmallow import Schema, fields, ValidationError


app = Flask(__name__)
CORS(app)
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///expenses.db'
db = SQLAlchemy(app)
auth = HTTPBasicAuth()


@app.route("/")
def hello():
    user = app.config['USERS'].keys()[0]
    return jsonify({"Hello": user})


@auth.get_password
def get_pw(username):
    if username in app.config['USERS']:
        return app.config['USERS'].get(username)
    return None


@auth.error_handler
def unauthorized():
    # return 403 instead of 401 to prevent browsers from displaying the default
    # auth dialog
    return make_response(jsonify({'message': 'Unauthorized access'}), 403)


##### MODELS #####

class Settlement(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    timestamp = db.Column(db.DateTime)


class Expense(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.DECIMAL, nullable=False)
    timestamp = db.Column(db.DateTime)
    settlement_id = db.Column(db.Integer, db.ForeignKey(Settlement.id))
    settlement = db.relationship('Settlement', backref=db.backref('expenses', lazy='dynamic'))
    user = db.Column(db.String, nullable=False)
    note = db.Column(db.String)


##### SCHEMAS #####

class SettlementSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str()
    timestamp = fields.DateTime(dump_only=True)


def user_validator(user):
    if user not in app.config['USERS']:
        raise ValidationError('Unknown user.')


class ExpenseSchema(Schema):
    id = fields.Int(dump_only=True)
    amount = fields.Decimal(places=2)
    timestamp = fields.DateTime(dump_only=True)
    settlement = fields.Nested(SettlementSchema)
    user = fields.Str(required=True, validate=user_validator)
    note = fields.Str()


settlement_schema = SettlementSchema()
settlements_schema = SettlementSchema(many=True)
expense_schema = ExpenseSchema()
expenses_schema = ExpenseSchema(many=True)


#### API ####

@app.route('/api/expenses')
def get_expenses():
    expenses = Expense.query.all()
    result = expenses_schema.dump(expenses)
    return jsonify({'expenses': result.data})


@app.route('/api/expense/<int:expense_id>')
def get_expense(expense_id):
    try:
        expense = Expense.query.get(expense_id)
    except IntegrityError:
        return jsonify({'message': 'Expense not found.'}), 400
    expense_result = expense_schema.dump(expense)
    return jsonify({'expense': expense_result.data})


@app.route('/api/expenses', methods=['POST'])
@auth.login_required
def new_expense():
    json_data = request.get_json()
    if not json_data:
        return jsonify({'message': 'No input data provided.'}), 400
    # Validate and deserialize input
    data, errors = expense_schema.load(json_data)
    if errors:
        return jsonify(errors), 422
    expense = Expense(amount=data['amount'], timestamp=datetime.utcnow(), user=data['user'], note=data['note'])
    db.session.add(expense)
    db.session.commit()
    result = expense_schema.dump(Expense.query.get(expense.id))
    return jsonify({'message': 'Created new expense.', 'expense': result.data})


if __name__ == "__main__":
    app.config.update(dict(
        USERS={
            'alice': 'asdf'
        }
    ))
    db.create_all()
    app.run(debug=True)
