export interface IUserCallbackMes {
    username?: string,
    token?: string,
    role?: string,
    homeRouteList?: object[],
};
export type fetchStatus = 'init' | 'loading' | 'fulfilled' | 'rejected';
export interface IUserType  { 
    user: { 
        datas: IUserCallbackMes | undefined;
        status: fetchStatus;
        error: string | null
    }
}
export type Path = {
  path: string,
  label: string
} 
export interface NavStateType {
   currentActivePath: Path
}