import { getCharacter, getCharacters, getEpisode } from 'rickmortyapi';

export class RickMortyApi {
    private static instance: RickMortyApi;

    public static getInstance(): RickMortyApi {
        if (!RickMortyApi.instance) {
            RickMortyApi.instance = new RickMortyApi();
        }

        return RickMortyApi.instance;
    }

    public async getCharacters(pageNumber: number = 1) {
        const r = await getCharacters({ page: pageNumber });
        return {
            total: r.data.info?.count,
            data: r.data.results?.map((character) => ({
                id: character.id,
                name: character.name,
                status: character.status,
                image: character.image,
                gender: character.gender,
                species: character.species,
                locationName: character.location?.name,
                origin: character.origin?.name,
                created: character.created,
            })),
        };
    }

    public async getCharacter(id: number) {
        const r = await getCharacter(id);
        const episodeIds = r.data.episode?.map((episode) =>
            parseInt(episode.substring(episode.lastIndexOf('/') + 1), 10),
        );
        const episodes = await getEpisode(episodeIds);

        return {
            id: r.data.id,
            name: r.data.name,
            status: r.data.status,
            image: r.data.image,
            gender: r.data.gender,
            species: r.data.species,
            locationName: r.data.location?.name,
            origin: r.data.origin?.name,
            created: r.data.created,
            episodes:
                (Array.isArray(episodes.data)
                    ? episodes.data
                    : [episodes.data]
                )?.map((episode) => ({
                    id: episode.id,
                    name: episode.name,
                    airDate: episode.air_date,
                    code: episode.episode,
                })) || [],
        };
    }
}
