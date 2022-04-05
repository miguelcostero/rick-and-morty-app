import { Router } from 'express';
import { FavCharactersModel } from '../models/fav-characters.model';
import { RickMortyApi } from '../rickmortyapi.client';

const rickMortyApi = RickMortyApi.getInstance();

const characterController = Router();

characterController.get('/', async (req, res) => {
    const pageNumber = parseInt((req.query.pageNumber as string) || '1', 10);

    const result = await rickMortyApi.getCharacters(pageNumber);

    const favCharactersMap = await FavCharactersModel.findFavCharactersForUser(
        res.locals.user._id,
    );

    res.send({
        pageNumber,
        total: result.total,
        data:
            result.data?.map((character) => {
                return {
                    ...character,
                    isFav: !!favCharactersMap[character.id],
                    favSince: favCharactersMap[character.id]?.addedAt,
                };
            }) || [],
    });
});

characterController.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ error: 'No id provided' });
        return;
    }

    const characterId = parseInt(req.params.id, 10);

    const result = await rickMortyApi.getCharacter(characterId);
    const favCharactersMap = await FavCharactersModel.findFavCharactersForUser(
        res.locals.user._id,
    );

    res.send({
        ...result,
        isFav: !!favCharactersMap[result.id],
        favSince: favCharactersMap[result.id]?.addedAt,
    });
});

characterController.post('/:id/fav', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ error: 'No id provided' });
        return;
    }

    const characterId = parseInt(req.params.id, 10);

    await FavCharactersModel.addFavCharacter(res.locals.user._id, characterId);

    res.send({});
});

characterController.delete('/:id/fav', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ error: 'No id provided' });
        return;
    }

    const characterId = parseInt(req.params.id, 10);

    await FavCharactersModel.removeFavCharacter(
        res.locals.user._id,
        characterId,
    );

    res.send({});
});

export default characterController;
