export interface IBase {
    id: number;
    meta: Meta;
  }
  export class Meta {
    access_token: string;
    count: number;
    limit: number;
    offset: number;
    totalCount: number;
    expires_in: number;
    refresh_token: string;
    status: string;
    token_type: string;
  }
  export interface IModules extends IBase {
      id: number;
      name: string;
      description: string;
  }
