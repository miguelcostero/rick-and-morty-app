import {
    getModelForClass,
    modelOptions,
    prop,
    Ref,
    ReturnModelType,
} from '@typegoose/typegoose';
import { User } from './user.model';

export class FavCharacterSubDocument {
    @prop({ required: true })
    characterId!: number;

    @prop({ default: new Date() })
    addedAt!: Date;
}

@modelOptions({ schemaOptions: { timestamps: true } })
export class FavCharacters {
    @prop({ required: true, ref: () => User })
    userId: Ref<User>;

    @prop({ default: [], type: () => [FavCharacterSubDocument] })
    characters: FavCharacterSubDocument[] = [];

    public static async findByUserId(
        this: ReturnModelType<typeof FavCharacters>,
        userId: Ref<User>,
    ) {
        return await this.findOne({ userId });
    }

    public static async findFavCharactersForUser(
        this: ReturnModelType<typeof FavCharacters>,
        userId: Ref<User>,
    ) {
        const favCharacters = await this.findByUserId(userId);
        return (
            favCharacters?.characters?.reduce<
                Record<number, FavCharacterSubDocument>
            >((obj, item) => {
                obj[item.characterId] = item;
                return obj;
            }, {}) || {}
        );
    }

    public static async addFavCharacter(
        this: ReturnModelType<typeof FavCharacters>,
        userId: Ref<User>,
        characterId: number,
    ) {
        const favCharacters = await this.findByUserId(userId);

        if (!favCharacters) {
            await this.create({
                userId,
                characters: [{ characterId }],
            });
        } else {
            await favCharacters.updateOne({
                $push: { characters: { characterId } },
            });
        }
    }

    public static async removeFavCharacter(
        this: ReturnModelType<typeof FavCharacters>,
        userId: Ref<User>,
        characterId: number,
    ) {
        const favCharacters = await this.findByUserId(userId);

        if (!favCharacters) {
            return;
        }

        await favCharacters.updateOne({
            $pull: { characters: { characterId } },
        });
    }
}

export const FavCharactersModel = getModelForClass(FavCharacters);
