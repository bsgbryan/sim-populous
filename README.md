What is this?
=============

I loved SimCity growing up. This is my attempt at creating a SimCity-like game
in the browser.

It's *waayyy* more basic than SimCity (even the original NES/PC version).
However, my hope is that even this simple little game can be fun.

How does it work?
=================

For now, the game works on a 50x50 grid of tiles.

Each tile can be `residential`, `commercial`, `industrial`, `education`, or
`public`. There are multiple levels for each tile type.

Roads are not built in this early version - I'd like to add roads later, but I
want to focus on the mechanics involving how the different tile types effect
each other first.

Each tile currently has five properties:

1. work
2. learn
3. fun
4. power
5. water

I'm not exactly sure if these properties make sense, but it's a start.

The basic idea is that each tile's `state` will be reevaluated each turn based
on the value of the tile's properties (and probably a few pseudo-random external
influences as well). Each tile's `state` will resolve to a `value` the `value`
for all tiles will be calculated periodically to determine how the player is
doing.

For now, I'm thinking a tile's `value` will be something like "population" -
meaning the higher the `value` the more populated a tile is. A tile's population
determines that tile's tax contribution. Taxes are tallied periodically and
awarded to the player to allow them to purchase additional tiles.

If a player runs out of tax income, their game will end.
