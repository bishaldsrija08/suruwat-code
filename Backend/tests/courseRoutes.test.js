require("ts-node/register/transpile-only");

const assert = require("node:assert/strict");
const { once } = require("node:events");
const { test } = require("node:test");
const app = require("../src/app");
const { default: Course, CourseStatus } = require("../src/models/courses/course.model");

test("course search takes precedence over slug lookup", async (t) => {
    const course = { courseTitle: "JavaScript Basics" };
    const find = t.mock.method(Course, "find", async () => [course]);
    const findOne = t.mock.method(Course, "findOne", async () => course);
    const server = app.listen(0);
    t.after(() => new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve())));
    await once(server, "listening");
    const base = `http://127.0.0.1:${server.address().port}/api/courses`;

    const searchResponse = await fetch(`${base}/search?title=java`);
    assert.equal(searchResponse.status, 200);
    assert.deepEqual((await searchResponse.json()).data, [course]);
    assert.deepEqual(find.mock.calls[0].arguments[0], {
        courseTitle: { $regex: "java", $options: "i" },
        courseStatus: CourseStatus.PUBLISHED
    });
    assert.equal(findOne.mock.callCount(), 0);

    const missingTitleResponse = await fetch(`${base}/search`);
    assert.equal(missingTitleResponse.status, 400);
    assert.equal(find.mock.callCount(), 1);
    assert.equal(findOne.mock.callCount(), 0);

    const slugResponse = await fetch(`${base}/javascript-basics`);
    assert.equal(slugResponse.status, 200);
    assert.deepEqual(findOne.mock.calls[0].arguments[0], {
        courseSlug: "javascript-basics",
        courseStatus: CourseStatus.PUBLISHED
    });
});
