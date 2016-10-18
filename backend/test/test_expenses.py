from expenses.expenses import app


def test_hello():
    app.config.update(dict(USERS= {'testuser': 'testpwd'}))
    testclient = app.test_client()
    rv = testclient.get('/')
    assert rv.data == '''\
{
  "Hello": "testuser"
}
'''
