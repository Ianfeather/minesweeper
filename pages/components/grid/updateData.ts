function getLeft({ x, y }) {
    return { x: Math.max(0, x - 1), y };
}
function getRight({ x, y }, max) {
    return { x: Math.min(max, x + 1), y }
}
function getUp({ x, y }) {
    return { x, y: Math.max(0, y - 1) };
}
function getDown({ x, y }, max) {
    return { x, y: Math.min(max, y + 1) };
}
function getTopRight({ x, y }, max) {
    return { x: Math.min(max, x + 1), y: Math.max(0, y - 1 ) };
}
function getBottomRight({ x, y }, max) {
    return { x: Math.min(max, x + 1), y: Math.min(max, y + 1 ) };
}
function getBottomLeft({ x, y }, max) {
    return { x: Math.max(0, x - 1), y: Math.min(max, y + 1 ) };
}
function getTopLeft({ x, y }, max) {
    return { x: Math.max(0, x - 1), y: Math.max(0, y - 1 ) };
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
    ]
}


function minesInProximity(coords, grid) {
    const surroundings = getSurrounding(coords, grid)
    return surroundings.reduce((sum, {x, y}) => {
        if (grid[y][x].isMine) { sum ++};
        return sum;
    }, 0)
}

export default function updateData(grid, coords) {
    if (!grid[coords.y][coords.x]) {
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

    let right = getRight(coords, grid.length - 1);
    updateData(grid, right)

    let down = getDown(coords, grid.length - 1);
    updateData(grid, down);

    let left = getLeft(coords);
    updateData(grid, left)

    return grid;
}
