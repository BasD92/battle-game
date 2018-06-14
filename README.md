# Inleverdocument PRG01-8

## Inleiding

Toelichting van je spelconcept

## Speelbare game

https://basd92.github.io/battle-game/

## Installatie

Instructies voor het clonen, editen en runnen van de game via deze repository.

## Klassendiagram

Het klassendiagram van je game.

## Pull request

Link pull request naar Olcay: https://github.com/Olcay4/prog8project/pull/1 (Singleton geïmplementeerd in Game class en Game loop toegevoegd)
Link fork: https://github.com/BasD92/prog8project

## Peer review

Link peer review: https://github.com/Olcay4/prog8project/issues/2

## Singleton

Ik heb Singleton toegepast in de Game class. Van de Game class hoeft maar 1 object gemaakt te worden. Als het scherm laadt, dan wordt er 1 Game object aangemaakt, doordat de Game class de static method 'getInstance' aanroept en deze method controleert of er een object is aangemaakt. Als er al een object is aangemaakt, vindt er een return plaats, als er nog geen object is aangemaakt, dan maakt deze static method het object aan.

## Polymorfisme

In de Game class heb ik een array gemaakt waarin verschillende objecten zitten die overerven van GameObject. Door middel van een loop worden 2 Food en Rock objecten "gepusht" in de array. Met een for loop kan ik met de objecten allemaal de update() method aanroepen. Om specifiek een method aan te roepen per object gebruik ik 'instanceof'.

## Strategy

Beschrijf waar en waarom je het strategy pattern hebt toegepast.

## Observer

Beschrijf waar en waarom je het observer pattern hebt toegepast.

## Gameplay componenten

Beschrijf per component waar en waarom je het hebt toegepast