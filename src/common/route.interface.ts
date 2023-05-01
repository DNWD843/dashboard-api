import { Request, Response, NextFunction, Router } from 'express'

export interface IBaseControllerRoute {
    path: string;
    func: (req: Request, res: Response, next: NextFunction) => void
    method: Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>
}
