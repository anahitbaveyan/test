import {NextFunction, Request, Response} from "express";
import {NodeService} from "../services/node.service";
import {getNode4js} from "../services/noe4j";
import {lastValueFrom} from "rxjs";

export default class NodeController {
    static async get(req:Request,res:Response,next:NextFunction){
        try{
            const nodes = await NodeService.getAll();
            const neo4j = await lastValueFrom(await getNode4js());
            return res.json({
                status:200,
                nodes,
                neo4j,
            })
        }catch (e) {
            next(e)
        }
    }

    static async create(req:Request,res:Response,next:NextFunction) {

        try{
            const {name,properties} = req.body;
            const response =  await NodeService.create(name,properties)
            return res.json({
                status:200,
                response
            })
        }catch (e) {
            next(e)
        }
    }

    static async update(req:Request,res:Response,next:NextFunction) {
        try{
            const id = Number(req.params.id);
            const {name,properties} = req.body;
            const response =  await NodeService.update(id,name,properties)
            return res.json({
                status:200,
                response
            })
        }catch (e) {
            next(e)
        }
    }

    static async delete(req:Request,res:Response,next:NextFunction) {
        try{
            const id = Number(req.params.id);
            const response =  await NodeService.delete(id)
            return res.json({
                status:200,
                response
            })
        }catch (e) {
            next(e)
        }
    }
}