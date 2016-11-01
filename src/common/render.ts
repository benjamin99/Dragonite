
function renderJSON(context: any, status: number, body: any) {
  context.status = status;
  context.type = 'json';
  context.body = body;
};

export function render(context: any, status: number, body: any) {
  return renderJSON(context, status, body);
};
