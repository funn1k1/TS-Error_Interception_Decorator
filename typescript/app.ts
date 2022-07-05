interface IUserService {
    users: number;
    getUsersInDatabase(): number;
}

class UserService implements IUserService {
    users: number = 1000;

    @Catch({ rethrow: false  })
    getUsersInDatabase(): number {
        throw new Error('Some error');
    }
}


function Catch( { rethrow }: {rethrow: boolean} = { rethrow: true} ) {
    return (
        target: Object,
        _: string | symbol,
        descriptor: TypedPropertyDescriptor<(...args: any[]) => any>
    ): TypedPropertyDescriptor<(...args: any[]) => any> | void => {
        const oldMethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            try {
                return oldMethod?.apply(target, args);
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

console.log(new UserService().getUsersInDatabase());