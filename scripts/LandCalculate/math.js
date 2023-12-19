/**
 * Class for mathematical and spatial operations related to land usage.
 * @param {number[]} value - The initial coordinates [x, z] representing a point in space.
 * @constructor
 * @writter @Nperma
 */
export class MATH {
    constructor(value) {
        /**
         * Initial coordinates representing a point in space.
         * @type {number[]}
         */
        this.value = value;
    }

    /**
     * Generate a random value within a specified percentage range.
     * @param {number} [percent=1] - The percentage range for random value generation.
     * @param {number} [radiusPercent=0] - The radius percentage for additional randomness.
     * @returns {number} - The randomly generated value.
     */
    randomly(percent = 1, radiusPercent = 0) {
        const minValue = Math.max(0.01 * percent * this.value, 100);
        const maxValue = this.value;
        const randomValue =
            Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

        const withRP = Math.floor(
            randomValue * Math.min(radiusPercent * 0.01, 1)
        );

        const ResultValue = radiusPercent > 0 ? withRP : randomValue;

        return ResultValue;
    }

    /**
     * Check if the point is within a specified box.
     * @param {Object} box - The box object with start and end points defining the region.
     * @param {number[]} box.start - The starting coordinates [x, z] of the box.
     * @param {number[]} box.end - The ending coordinates [x, z] of the box.
     * @returns {boolean} - True if the point is inside the box, false otherwise.
     */
    testInbox(box) {
        const pos = this.value;
        const { start, end } = box;
        return (
            pos[0] >= Math.min(start[0], end[0]) &&
            pos[0] <= Math.max(start[0], end[0]) &&
            pos[1] >= Math.min(start[1], end[1]) &&
            pos[1] <= Math.max(start[1], end[1])
        );
    }

    /**
     * Get the center point of a specified box.
     * @param {Object} box - The box object with start and end points defining the region.
     * @param {number[]} box.start - The starting coordinates [x, z] of the box.
     * @param {number[]} box.end - The ending coordinates [x, z] of the box.
     * @returns {Object} - Object with x and z properties representing the center coordinates.
     */
    getCenter(box) {
        const { start, end } = box;
        const centerX = (start[0] + end[0]) / 2;
        const centerZ = (start[1] + end[1]) / 2;
        return { x: centerX, z: centerZ };
    }

    /**
     * Get information about the proximity of the point to a specified tile.
     * @param {Object} box - The box object with start and end points defining the tile.
     * @param {number[]} box.start - The starting coordinates [x, z] of the tile.
     * @param {number[]} box.end - The ending coordinates [x, z] of the tile.
     * @returns {Object} - Object with status, center, distanceToEnter, and tile properties.
     */
    getTile(box) {
        const center = this.getCenter(box);

        const status = this.testInbox(box);
        if (!status) {
            const distanceToEnterX = Math.min(
                Math.abs(this.value[0] - box.start[0]),
                Math.abs(this.value[0] - box.end[0])
            );

            const distanceToEnterZ = Math.min(
                Math.abs(this.value[1] - box.start[1]),
                Math.abs(this.value[1] - box.end[1])
            );

            return {
                status,
                center,
                distanceToEnter: Math.round(
                    Math.sqrt(distanceToEnterX ** 2 + distanceToEnterZ ** 2)
                ),
                tile: "Tile Information"
            };
        }
        return {
            status,
            center,
            distanceToEnter: 0,
            tile: "Tile Information"
        };
    }
    }
