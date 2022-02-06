import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { errors } from '@shared/constants';
import userService from '@services/userService';



// Constants
const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

// Paths
export const p = {
    get: '/all',
    add: '/add',
    update: '/update',
    delete: '/delete/:id',
} as const;



/**
 * Get all users.
 */
router.get(p.get, async (_: Request, res: Response) => {
    const users = await userService.getAll();
    return res.status(OK).json({users});
});


/**
 * Add one user.
 */
router.post(p.add, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: errors.paramMissing,
        });
    }
    // Fetch data
    await userService.addOne(user);
    return res.status(CREATED).end();
});


/**
 * Update one user.
 */
router.put(p.update, async (req: Request, res: Response) => {
    const { user } = req.body;
    // Check param
    if (!user) {
        return res.status(BAD_REQUEST).json({
            error: errors.paramMissing,
        });
    }
    // Fetch data
    const { error } = await userService.updateOne(user);
    if (!!error) {
        return res.status(BAD_REQUEST).json({error});
    }
    return res.status(OK).end();
});


/**
 * Delete one user.
 */
router.delete(p.delete, async (req: Request, res: Response) => {
    const { id } = req.params;
    // Check param
    if (!id) {
        return res.status(BAD_REQUEST).json({
            error: errors.paramMissing,
        });
    }
    // Fetch data
    const { error } = await userService.delete(Number(id));
    if (!!error) {
        return res.status(BAD_REQUEST).json({error});
    }
    return res.status(OK).end();
});


// Export default
export default router;
