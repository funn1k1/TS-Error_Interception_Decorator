interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Catch()
    getUsersInDatabase(): number {
        throw new Error('Ошибка');
    }
}


function Catch(rethrow: boolean = false) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const oldMethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            try {
                oldMethod?.apply(target, args);
            } catch (err) {
                if (err instanceof Error) {
                    console.log(err.message);
                    if (rethrow) {
                        throw err;
                    }
                }
            }
        }
    }
}