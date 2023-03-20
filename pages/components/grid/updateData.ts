function getLeft({ x, y }, distance=1) {
    return { x: Math.max(0, x - distance), y };
}

function getRight({ x, y }, distance=1, max) {
    return { x: Math.min(max, x + distance), y }
}

function getUp({ x, y }, distance=1) {
    return { x, y: Math.max(0, y - distance) };
}
function getDown({ x, y }, distance=1, max) {
    return { x, y: Math.min(max, y + distance) };
}


function proximityToMine(coords, grid) {
    let left = getLeft(coords);
    let right = getRight(coords, 1, grid.length - 1);
    let up = getUp(coords);
    let down = getDown(coords, 1, grid.length - 1);
    if (
        grid[left.y][left.x].isMine === true ||
        grid[right.y][right.x].isMine === true ||
        grid[up.y][up.x].isMine === true ||
        grid[down.y][down.x].isMine === true
        ) { return 1 }

    left = getLeft(coords, 2);
    right = getRight(coords, 2, grid.length - 1);
    up = getUp(coords, 2);
    down = getDown(coords, 2, grid.length - 1);

    if (
        grid[left.y][left.x].isMine === true ||
        grid[right.y][right.x].isMine === true ||
        grid[up.y][up.x].isMine === true ||
        grid[down.y][down.x].isMine === true
        ) { return 2 }

    return 0;
}

export default function updateData(grid, coords) {
    console.log(`lookng at x:${coords.x}, y:${coords.y}`);
    if (grid[coords.y][coords.x].isSeen) {
        console.log(`x:${coords.x}, y:${coords.y} is seen`);
        return grid;
    }

    if (grid[coords.y][coords.x].isMine) {
        console.log(`x: ${coords.x}, y: ${coords.y} is a mine`);
        return grid;
    }

    // Set proximity value
    let proximity = proximityToMine(coords, grid);
    grid[coords.y][coords.x].value = proximity;
    grid[coords.y][coords.x].isSeen = true;
    if (proximity !== 0) {
        return grid;
    }



    // recurse
    let left = getLeft(coords);
    let right = getRight(coords, 1, grid.length);
    let up = getUp(coords);
    let down = getDown(coords, 1, grid.length);

    updateData(grid, down);
    updateData(grid, left)
    updateData(grid, right)
    updateData(grid, up)

    return grid;
}
