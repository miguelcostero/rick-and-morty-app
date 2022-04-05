import { Router } from 'express';
import { getCharacter, getCharacters } from 'rickmortyapi';
import { FavCharactersModel } from '../models/fav-characters.model';

const characterController = Router();

characterController.get('/', async (req, res) => {
    const pageNumber = parseInt((req.query.pageNumber as string) || '1', 10);

    const result = await getCharacters({ page: pageNumber });

    const favCharactersMap = await FavCharactersModel.findFavCharactersForUser(
        res.locals.user._id,
    );

    res.send({
        pageNumber,
        total: result.data.info?.count,
        data:
            result.data.results?.map((character) => ({
                id: character.id,
                name: character.name,
                status: character.status,
                image: character.image,
                gender: character.gender,
                species: character.species,
                locationName: character.location?.name,
                origin: character.origin?.name,
                created: character.created,
                isFav: !!favCharactersMap[character.id],
                favSince: favCharactersMap[character.id]?.addedAt,
            })) || [],
    });
});

characterController.get('/:id', async (req, res) => {
    if (!req.params.id) {
        res.status(400).send({ error: 'No id provided' });
        return;
    }

    const characterId = parseInt(req.params.id, 10);

    const result = await getCharacter(characterId);
    const favCharactersMap = await FavCharactersModel.findFavCharactersForUser(
        res.locals.user._id,
    );

    res.send({
        id: result.data.id,
        name: result.data.name,
        status: result.data.status,
        image: result.data.image,
        gender: result.data.gender,
        species: result.data.species,
        locationName: result.data.location?.name,
        origin: result.data.origin?.name,
        created: result.data.created,
        isFav: !!favCharactersMap[result.data.id],
        favSince: favCharactersMap[result.data.id]?.addedAt,
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
