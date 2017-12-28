import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
  constructor() {
    // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
    // when an error happens. If we do not rethrow, bootstrap will always succeed.
    super();
  }

  handleError(error) {
    // send the error to the server
    console.group("ErrorHandler:");
    console.error(error);
    console.error(error.originalError);
    console.error(error.message);
    console.error(error.stack);
    console.groupEnd();

    // delegate to the default handler
    super.handleError(error);
  }
}
