# Inleverdocument PRG01-8

## Inleiding

De player is een kleine soldaat die je kan besturen met de pijltjestoetsen. De soldaat kan ook schieten. Met een druk op de spatietoets kan de soldaat schieten. Het is de bedoeling om de zombies in het spel neer te schieten. Als alle zombies zijn neergeschoten, heeft de player van het spel gewonnen. Echter heeft de soldaat maar 2 levens. Door eten (kersen) te pakken, kan daar een leven bijkomen. De zombies schrikken als de soldaat eet en sterker is geworden. Hierdoor krimpen de zombies. Ze zijn daardoor moeilijker te raken. Als de soldaat in botsing komt met een zombie of een rots, dan gaat er een leven van af. Als de soldaat geen levens meer heeft, dan is het game over.

## Speelbare game

https://basd92.github.io/battle-game/

## Installatie

Via deze repository kan je het project clonen. De clone doe je in de root map van een lokale server, zoals XAMPP of MAMP. Het editen kan in Visual Studio Code. Als het project daar is geopend kan je "Ctrl+Shift+B" intoetsen en de "watch-mode" aanzetten. Hierdoor compileren de Typescript bestanden automatisch naar ES5 (JavaScript) bij een wijziging in de code. Door het compileren is de code leesbaar voor de browser. De game kan je runnen en spelen door deze link aan te houden: http://localhost/battle-game/docs/index.html

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

In de Game class heb ik een array gemaakt waarin verschillende objecten zitten die overerven van GameObject. Door middel van een loop worden 2 Food en Rock objecten "gepusht" in de array. Met een for loop kan ik met de objecten allemaal de update() method aanroepen en collisions controleren. Om specifiek een method aan te roepen per object gebruik ik 'instanceof'.

## Strategy

De player en de zombies hebben een verschillend gedrag qua snelheid, daarom heb ik hier een Strategy Pattern toegepast. De classes Fast en Slow implementeren de Behaviour interface. Allebei de classes hebben een GameObject en de snelheid is in de update() method gezet. In de Player en Zombie class zijn in de constructor nieuwe objecten aangemaakt van het type Behaviour. In de update() methods van de Player en Zombie class kunnen hierdoor de update() methods van beide classes (Fast en Slow) aangeroepen worden. De Player is snel en gebruikt Fast. De zombie is langzamer en gebruikt Slow.

## Observer

Het observer pattern heb ik toegepast om een notificatie te sturen naar de zombies als de soldaat heeft gegeten. Hierdoor is de soldaat sterker en krimpen de zombies van de schrik. Op deze manier kunnen alle zombies tegelijk reageren. Player implementeert de Subject interface. Hierdoor heeft Player een lijst met observers en een subscribe() method. Zombie implementeert van de Observer interface. De notify() method is daarom toegevoegd aan Zombie. Ook heeft de Zombie een Subject (player), zodat de zombies zich kunnen 'subscriben' en pushen in de observers array. In de Game class wordt bijgehouden wanneer de soldaat eet en sterker wordt. Als dit het geval is wordt de strongerPlayer() method van het Player object aangeroepen. Deze geeft met de notify method aan alle observers door dat de soldaat sterker is geworden. Uit angst voor de soldaat krimpen daarom de zombies.

## Gameplay componenten

Beschrijf per component waar en waarom je het hebt toegepast