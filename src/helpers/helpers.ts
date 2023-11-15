const he = require('he');

const ResponseData = (status: number, message: string | null, error: any | null, data: any | null) => {
	if (error != null && error instanceof Error) {
		const response = {
			status: status,
			message: error.message,
			errors: error,
			data: []
		}

		return response;
	}

	const res = {
		status,
		message,
		errors: error,
		data: data
	};

	return res;
};

function antiInjection(input:any) {    
     const cleanedInput = input.replace(/[^\w\s.-]/gi, '');
 
     if (input !== cleanedInput) {
         throw new Error('Terdeteksi huruf spesial');
     }
 
     return cleanedInput;
}

export default { ResponseData, antiInjection };