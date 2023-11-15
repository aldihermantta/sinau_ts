import { Request, Response } from "express";
import user from "../models/user";
import { format, utcToZonedTime } from 'date-fns-tz';
import helpers from "../helpers/helpers";
import sad from "../middleware/encrypt";
import Role from "../models/role";
import JWTAuth from "../middleware/JWTAuth";
import bcrypt from "bcrypt";

const data = helpers.ResponseData;
const anti_injeksi = helpers.antiInjection;

const getUser = async (req:Request, res:Response): Promise<Response> => {
     try {
          const where = {
               username: anti_injeksi(req.query.username) ? anti_injeksi(req.query.username) : null
          };
          
          const whereClause: Record<string, any> = {};
          
          if (where.username !== null && where.username !== undefined) {
               whereClause.username = where.username;
          }
     
          const users = await user.findAll({
               where: whereClause,
               attributes:{
                    exclude: [
                         'password', 'createdAt', 'updatedAt'
                    ]
               },
               include:{
                    model: Role,
                    attributes: [
                         'id', 'nama'
                    ],
                    as: 'role'
               }
          });
          
          if(users.length > 0){
               return res.status(200).send(data(200, "Menampilkan semua data user", null, users));
          }
          
          return res.status(400).send(data(400, "tidak ada data user", null, []));

     } catch (error:any) {
		return res.status(500).send(data(500, "Internal server error", error, []));
     }
}

const createdUser = async (req: Request, res: Response): Promise<Response> => {
     try {
          const waktu = utcToZonedTime(new Date(), 'Asia/Jakarta');

          const now: string = format(waktu, "yyyy-MM-dd");
          
          const { username, nama, email, password, id_role } = req.body;
          const hash = await sad.encrypt(password);

          const created = await user.create({
               // username, nama, email, createdAt: now ,updatedAt: now, password: hash, id_role
          })

          return res.status(201).send(data(201, "tidak ada data user", null, created));
     } catch (error:any) {
		return res.status(500).send(data(500, "Internal server error", error, []));
     }
}

const UserLogin = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { username, password } = req.body;
          const login = await user.findOne({
               attributes: ["username", "password"],
			where: {
				username: username
			}
		});

		if (!login) {
			return res.status(401).send(data(401, "Unauthorized", null, null));
		}

		const matched = await sad.Compare(password, login.password);
          
		if (!matched) {
			return res.status(401).send(data(401, "Unauthorized", null, null));
		}

		return res.status(200).send(data(200, "OK", null, login));
	} catch (error: any) {
		return res.status(500).send(data(500, "", error, null));
	}
};

export default { getUser, createdUser, UserLogin };