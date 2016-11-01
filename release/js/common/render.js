"use strict";
function renderJSON(context, status, body) {
    context.status = status;
    context.type = 'json';
    context.body = body;
}
;
function render(context, status, body) {
    return renderJSON(context, status, body);
}
exports.render = render;
;
