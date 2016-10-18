# -*- coding: utf-8 -*-
from setuptools import setup


setup(
    name='expenses',
    version='0.0.1',
    description='Example project for Flask and ReactJS.',
    packages=[
        'expenses',
        ],
    include_package_data=True,
    install_requires=[
        'flask',
    ],
    tests_require=[
        'pytest',
    ]
)
