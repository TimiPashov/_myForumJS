// create function to bind other funcs to context

export function bindFuncToContext(functions: any, context: any) {
  const boundFunctions: any = {};
  for (const key in functions) {
    if (typeof functions[key] === 'function') {
      boundFunctions[key] = functions[key].bind(context);
    }
  }
  return boundFunctions;
}
