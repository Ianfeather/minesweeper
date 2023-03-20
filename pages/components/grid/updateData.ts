function getLeft({ x, y }) {
    return { x: x - 1, y };
}
function getRight({ x, y }) {
    return { x: x + 1, y }
}
function getUp({ x, y }) {
    return { x, y: y - 1 };
}
function getDown({ x, y }) {
    return { x, y: y + 1 };
}
function getTopRight({ x, y }) {
    return { x: x + 1, y: y - 1 };
}
function getBottomRight({ x, y }) {
    return { x: x + 1, y: y + 1 };
}
function getBottomLeft({ x, y }) {
    return { x: x - 1, y: y + 1 };
}
function getTopLeft({ x, y }) {
    return { x: x - 1, y: y - 1 };
}

const onGrid = ({x, y}, grid) => {
    return (x >= 0 && x < grid.length && y >= 0 && y < grid.length)
}

function getSurrounding(coords, grid) {
    return [
        getUp(coords),
        getTopRight(coords, grid.length - 1),
        getRight(coords, grid.length - 1),
        getBottomRight(coords, grid.length - 1),
        getDown(coords, grid.length - 1),
        getBottomLeft(coords, grid.length - 1),
        getLeft(coords),
        getTopLeft(coords, grid.length - 1)
    ].filter((_coords) => onGrid(_coords, grid));
}


function minesInProximity(coords, grid) {
    const surroundings = getSurrounding(coords, grid);
    return surroundings.reduce((sum, {x, y}) => {
        if (grid[y][x].isMine) { sum ++};
        return sum;
    }, 0)
}

export default function updateData(grid, coords) {
    if (!onGrid(coords, grid)) {
        return grid;
    }
    if (grid[coords.y][coords.x].isSeen) {
        return grid;
    }

    if (grid[coords.y][coords.x].isMine) {
        return grid;
    }

    // Set proximity value
    let count = minesInProximity(coords, grid);
    grid[coords.y][coords.x].value = count;
    grid[coords.y][coords.x].isSeen = true;
    if (count > 0) {
        return grid;
    }

    // recurse

    let up = getUp(coords);
    updateData(grid, up)

    let right = getRight(coords);
    updateData(grid, right)

    let down = getDown(coords);
    updateData(grid, down);

    let left = getLeft(coords);
    updateData(grid, left)

    return grid;
}
