

export const invalidResponse: Response = {
    status: 400,
    data: "Invalid data"
}
export async function executeFunction<T>(cb: FunctionToExecute<T>, opt: ExeFuncOpt): Promise<Response> {

    const options = {
        statusCode: opt?.statusCode || 200,
        timeout: opt?.timeout || 2 * 60 * 1000,
        error: opt?.error || "Internal Server Error."
    };

    try {
        //todo: add handle timeout
        const result = await cb();
        return {
            data: result,
            status: options.statusCode
        };
    } catch (error) {
        console.log(error)
        return await retryOperation(cb, opt);
    }
}

async function retryOperation<T>(cb: FunctionToExecute<T>, opt: ExeFuncOpt): Promise<Response> {
    try {
        //Add delay for retry operation
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(2*1000);

        const result = await cb();
        return {
            data: result,
            status: opt.statusCode as number
        };
    } catch (error) {
        console.log(error)
        return {
            data: opt.error,
            status: 500
        };
    }
}

type FunctionToExecute<T> = () => T;

type ExeFuncOpt = {
    statusCode?: number;
    timeout?: number;
    error?: any;//todo: check if we need it
};
interface Response {
    data: any,
    status: number
}

