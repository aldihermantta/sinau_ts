import Validator from "validatorjs";
import { Request, Response, NextFunction } from "express";
import helpers from "../../helpers/helpers";
import User from "../../models/user";

const Data = helpers.ResponseData;

const Register = async (req: Request, res: Response, next: NextFunction) => {
     try {
          const { username, name, email, password, konfirmasi_password } = req.body;
          const data = { username, name, email, password, konfirmasi_password };

          const rules: Validator.Rules = {
               "username"               : "required|string|max:50",
			"name"                   : "required|string|max:50",
			"email"                  : "required|email",
			"password"               : "required|min:8",
			"konfirmasi_password"    : "required|same:password"
		};
          
          const validate = new Validator(data, rules);

          if (validate.fails()) {
			return res.status(422).send(Data(422, "Bad Request", validate.errors.errors, null));
		}

          const user = await User.findOne({
			where: {
				email: data.email
			}
		});

		if (user) {
			const errorData = {			
                    email: [
                         "Email already used"
                    ]
			};

			return res.status(400).send(Data(400, "BadRequest", errorData, null))
		}

          next();
     } catch (error:any) {
          return res.status(500).send(Data(500, "", error, null));
     }
}
export default { Register }