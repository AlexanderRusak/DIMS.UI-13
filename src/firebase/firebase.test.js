import { signIn, createNewUser } from './auth';

describe(signIn, () => {
    test('Should return positive response from db', async () => {
        const result = await signIn('rusak.alexander2017@yandex.ru', '1234567890');
        expect(result).not.toBeFalsy();
    });

    test('Should return error', async () => {
        return signIn('rusak.alexander2017@yandex.ru', '21212121211212').catch(error => {
            expect(error).toBeInstanceOf(Error);
        })
    });
    test('Should return error', async () => {
        return signIn('test@yandex.ru', '1234567890').catch(error => {
            expect(error).toBeInstanceOf(Error);
        })

    });
})

describe(createNewUser, () => {
    const testEmail = 'test@mail.ru';
    test('Sholud create new user and return response', async () => {
        const result = await createNewUser(testEmail, testEmail);
        expect(typeof result).toBe('object');
    })
})
