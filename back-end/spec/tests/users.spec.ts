import supertest from 'supertest';
import StatusCodes from 'http-status-codes';
import { SuperTest, Test, Response } from 'supertest';

import app from '@server';
import userDao from '@daos/userDao';
import User, { IUser } from '@models/user';
import { pErr } from '@shared/functions';
import { errors } from '@shared/constants';
import { p as userPaths } from '@routes/users';
import userService from '@services/userService';

type TReqBody = string | object | undefined;


describe('Users Routes', () => {

    const usersPath = '/api/users';
    const getUsersPath = `${usersPath}/${userPaths.get}`;
    const addUsersPath = `${usersPath}/${userPaths.add}`;
    const updateUserPath = `${usersPath}/${userPaths.update}`;
    const deleteUserPath = `${usersPath}/${userPaths.delete}`;

    const { BAD_REQUEST, CREATED, OK } = StatusCodes;
    let agent: SuperTest<Test>;

    beforeAll((done) => {
        agent = supertest.agent(app);
        done();
    });


    /***********************************************************************************
     *                                    Test Get
     **********************************************************************************/

    describe(`"GET:${getUsersPath}"`, () => {

        it(`should return a JSON object with all the users and a status code of "${OK}" if the
            request was successful.`, (done) => {
            // Setup spy
            const users = [
                User.new('Sean Maxwell', 'sean.maxwell@gmail.com'),
                User.new('John Smith', 'john.smith@gmail.com'),
                User.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
            ];
            spyOn(userDao, 'getAll').and.returnValue(Promise.resolve(users));
            // Call API
            agent.get(getUsersPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    // Caste instance-objects to 'User' objects
                    const respUsers = res.body.users;
                    const retUsers: IUser[] = respUsers.map((user: IUser) => {
                        return User.copy(user);
                    });
                    expect(retUsers).toEqual(users);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object containing an error message and a status code of
            "${BAD_REQUEST}" if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not fetch users.';
            spyOn(userDao, 'getAll').and.throwError(errMsg);
            // Call API
            agent.get(getUsersPath)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });


    /***********************************************************************************
     *                                    Test Post
     **********************************************************************************/

    describe(`"POST:${addUsersPath}"`, () => {

        const callApi = (reqBody: TReqBody) => {
            return agent.post(addUsersPath).type('form').send(reqBody);
        };
        const userData = {
            user: User.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };

        it(`should return a status code of "${CREATED}" if the request was successful.`, (done) => {
            // Setup Spy
            spyOn(userDao, 'add').and.returnValue(Promise.resolve());
            // Call API
            agent.post(addUsersPath).type('form').send(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(CREATED);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${errors.paramMissing}" and a status
            code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
            // Call API
            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errors.paramMissing);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            // Setup spy
            const errMsg = 'Could not add user.';
            spyOn(userDao, 'add').and.throwError(errMsg);
            // Call API
            callApi(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errMsg);
                    done();
                });
        });
    });


    /***********************************************************************************
     *                                    Test Put
     **********************************************************************************/

    describe(`"PUT:${updateUserPath}"`, () => {

        const callApi = (reqBody: TReqBody) => {
            return agent.put(updateUserPath).type('form').send(reqBody);
        };
        const userData = {
            user: User.new('Gordan Freeman', 'gordan.freeman@gmail.com'),
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
            spyOn(userDao, 'update').and.returnValue(Promise.resolve());
            // Call Api
            callApi(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with an error message of "${errors.paramMissing}" and a
            status code of "${BAD_REQUEST}" if the user param was missing.`, (done) => {
            // Call api
            callApi({})
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(errors.paramMissing);
                    done();
                });
        });

        it(`should return a JSON object with the error message of ${userService.errors.userNotFound} 
            and a status code of "${BAD_REQUEST}" if the id was not found.`, (done) => {
            // Call api
            callApi(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(userService.errors.userNotFound);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
            // Setup spy
            const updateErrMsg = 'Could not update user.';
            spyOn(userDao, 'update').and.throwError(updateErrMsg);
            // Call API
            callApi(userData)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(updateErrMsg);
                    done();
                });
        });
    });


    /***********************************************************************************
     *                                    Test Delete
     **********************************************************************************/

    describe(`"DELETE:${deleteUserPath}"`, () => {

        const callApi = (id: number) => {
            return agent.delete(deleteUserPath.replace(':id', id.toString()));
        };

        it(`should return a status code of "${OK}" if the request was successful.`, (done) => {
            // Setup spy
            spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
            spyOn(userDao, 'delete').and.returnValue(Promise.resolve());
            // Call api
            callApi(5)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(OK);
                    expect(res.body.error).toBeUndefined();
                    done();
                });
        });

        it(`should return a JSON object with the error message of ${userService.errors.userNotFound} 
            and a status code of "${BAD_REQUEST}" if the id was not found.`, (done) => {
            // Call api
            callApi(-1)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(userService.errors.userNotFound);
                    done();
                });
        });

        it(`should return a JSON object with an error message and a status code of "${BAD_REQUEST}"
            if the request was unsuccessful.`, (done) => {
            spyOn(userDao, 'persists').and.returnValue(Promise.resolve(true));
            // Setup spy
            const deleteErrMsg = 'Could not delete user.';
            spyOn(userDao, 'delete').and.throwError(deleteErrMsg);
            // Call Api
            callApi(1)
                .end((err: Error, res: Response) => {
                    pErr(err);
                    expect(res.status).toBe(BAD_REQUEST);
                    expect(res.body.error).toBe(deleteErrMsg);
                    done();
                });
        });
    });
});
