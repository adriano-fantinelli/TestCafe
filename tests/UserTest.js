/**
 * TestCafe project for testing REST API endpoints in a microservices architecture.
 * Applies testing best practices: clean structure, reusable logic, data-driven tests, and environment handling.
 */

import { Selector, RequestLogger, RequestMock } from 'testcafe';
import { getToken, getTestUser, resetDatabase } from '../utils/helpers';
import config from '../utils/config';

const apiLogger = RequestLogger({
    url: /\/api\//,
    method: 'post'
}, {
    logRequestBody: true,
    logResponseBody: true
});

fixture`User Service API`
    .page`${config.baseUrl}`
    .requestHooks(apiLogger)
    .before(async ctx => {
        // Reset DB or set up fixtures
        await resetDatabase();
        ctx.token = await getToken();
    })
    .beforeEach(async t => {
        await t.setTestSpeed(1);
    });

test('Create a new user (POST /users)', async t => {
    const user = getTestUser();

    const response = await t.request({
        url: `${config.baseUrl}/api/users`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${t.fixtureCtx.token}`,
            'Content-Type': 'application/json'
        },
        body: user
    });

    await t.expect(response.status).eql(201);
    await t.expect(response.body).contains({ email: user.email });
});

test('Fetch user by ID (GET /users/:id)', async t => {
    const createResponse = await t.request({
        url: `${config.baseUrl}/api/users`,
        method: 'post',
        headers: {
            Authorization: `Bearer ${t.fixtureCtx.token}`,
            'Content-Type': 'application/json'
        },
        body: getTestUser()
    });

    const userId = createResponse.body.id;

    const fetchResponse = await t.request({
        url: `${config.baseUrl}/api/users/${userId}`,
        method: 'get',
        headers: {
            Authorization: `Bearer ${t.fixtureCtx.token}`
        }
    });

    await t.expect(fetchResponse.status).eql(200);
    await t.expect(fetchResponse.body.id).eql(userId);
});
