import { Router } from 'express';
import { getCharacters } from 'rickmortyapi';

const characterController = Router();

characterController.get('/', async (req, res) => {
    const result = await getCharacters();
    res.send(result.data);
});

export default characterController;
