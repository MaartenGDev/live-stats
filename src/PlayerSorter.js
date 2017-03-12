export default class PlayerSorter {
    static sortByPackages(firstUser, secondUser) {
        const firstPackagesCount = firstUser.stats.games.walls.packages.length;
        const secondPackagesCount = secondUser.stats.games.walls.packages.length;

        if (firstPackagesCount == secondPackagesCount) {
            return 0;
        }

        return firstPackagesCount < secondPackagesCount ? 1 : -1;
    }

    static sortByLevel(firstUser, secondUser) {
        const firstUserLevel = firstUser.level;
        const secondUserLevel = secondUser.level;

        if (firstUserLevel == secondUserLevel) {
            return 0;
        }

        return firstUserLevel < secondUserLevel ? 1 : -1;
    }
}