(function(global, docRef) {
    'use strict';

    function init() {
        runInventorsBornIn1500s();
        runInventorFirstAndLastNames();
        runInventorsByBirthdate();
        runInventorsTotalYearsAlive();
        runInventorsSortedByYearsLived();
        runGetParisBoulevardsWithde();
        runGetPeopleSortedByLastName();
        runSumOfDataInstances();
    }

    init();
    /////////////

    /**
     * 1. Filter the list of inventors for those who were born in the 1500's
     * Array.prototype.filter()
     */
    function runInventorsBornIn1500s() {
        const inventorsBornIn1500s = (getInventorData() ?? [])
            .filter((inventor) => {
                return (inventor.year >= 1500) && (inventor.year < 1600);
            });

        console.log('1. Inventors born in 1500s:');
        console.table(inventorsBornIn1500s);
    }

    /**
     * 2. Give us an array of the inventors first and last names
     * Array.prototype.map()
     */
    function runInventorFirstAndLastNames() {
        const inventorFirstLastNames = (getInventorData() ?? [])
            .map((inventor) => {
                return `${inventor.first ?? ''} ${inventor.last ?? ''}`;
            })

        console.log('2. Inventor first and last names: ', fmtJSON(inventorFirstLastNames));
    }

    /**
     * 3. Sort the inventors by birthdate, oldest to youngest
     * Array.prototype.sort()
     */
    function runInventorsByBirthdate() {
        const inventorsByBirthdate = (getInventorData() ?? [])
            .sort((a, b) => {
                if (a.year > b.year) { return 1; }
                if (a.year < b.year) { return -1; }
                return 0;
            });

        console.log('3. List of inventors sorted by birthdate:');
        console.table(inventorsByBirthdate)
    }

    /**
     * 4. How many years did all the inventors live?
     * Array.prototype.reduce()
     */
    function runInventorsTotalYearsAlive() {
        const totalYearsAlive = (getInventorData() ?? [])
            .reduce((acc, curr) => {
                acc += (curr.passed - curr.year);
                return acc;
            }, 0);

        console.log('4. Total years inventors were alive:', totalYearsAlive);
    }

    /**
     * 5. Sort the inventors by years lived
     */
    function runInventorsSortedByYearsLived(asc = true) {
        const inventorsSorted = (getInventorData() ?? [])
            .sort((a, b) => {
                const aLived = a.passed - a.year;
                const bLived = b.passed - b.year;

                if (aLived > bLived) { return asc ? 1 : -1; }
                if (aLived < bLived) { return asc ? -1 : 1; }
                return 0;
            })

        console.log('5. Inventors sorted by years lived:');
        console.table(inventorsSorted);
    }

    /**
     * 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
     * https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
     */
    function runGetParisBoulevardsWithde() {
        const boulevardsWithDe = (getParisBoulevardData() ?? [])
            .filter((boulevard) => {
                return (boulevard || '').toLowerCase().indexOf('de') > -1;
            });

        console.log('6. Boulevards in Paris that contain "de":\n', fmtJSON(boulevardsWithDe));
    }

    /**
     * 7. Sort Exercise
     * Sort the people alphabetically by last name
     */
    function runGetPeopleSortedByLastName(asc = true) {
        const peopleSortedByLastName = (getPeopleData() ?? [])
            .sort((a, b) => {
                const [aLast, aFirst] = a.split(',').map(part => part.trim())
                const [bLast, bFirst] = b.split(',').map(part => part.trim())

                if (aLast > bLast) { return asc ? 1 : -1; }
                if (aLast < bLast) { return asc ? -1 : 1; }
                return 0;
            })

        console.log('7. People sorted by lastname:\n', fmtJSON(peopleSortedByLastName))
    }

    /**
     * 8. Reduce Exercise
     * Sum up the instances of each of these
     * NOTE: these refer to data returned from getData()
     */
    function runSumOfDataInstances() {
        const instanceSum = (getData() ?? [])
            .reduce((acc, curr) => {
                acc[curr] = acc[curr] ? acc[curr] + 1 : 1;
                return acc;
            }, {})

        console.log('8. Sum of all of the instances:')
        console.table(instanceSum);
    }

    ///////////////////////////
    ////////// DATA ///////////
    ///////////////////////////


    function getData() {
        return ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
    }

    function getPeopleData() {
        return [
            'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
            'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
            'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
            'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
            'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
        ];
    }

    function getParisBoulevardData() {
        return [
            "Boulevard Auguste-Blanqui","Boulevard Barbès","Boulevard Beaumarchais","Boulevard de l'Amiral-Bruix",
            "Boulevard Mortier","Boulevard Poniatowski","Boulevard Soult","Boulevard des Capucines",
            "Boulevard de la Chapelle","Boulevard de Clichy","Boulevard du Crime","Boulevard du Général-d'Armée-Jean-Simon",
            "Boulevard Haussmann","Boulevard de l'Hôpital","Boulevard des Italiens","Boulevard Lefebvre",
            "Boulevard de la Madeleine","Boulevard de Magenta","Boulevard Malesherbes","Boulevard Marguerite-de-Rochechouart",
            "Boulevard Montmartre","Boulevard du Montparnasse","Boulevard Raspail","Boulevard Richard-Lenoir",
            "Boulevard Saint-Germain","Boulevard Saint-Michel","Boulevard de Sébastopol","Boulevard de Strasbourg",
            "Boulevard du Temple","Boulevard Voltaire","Boulevard de la Zone"
        ]
    }

    function getInventorData() {
        return [
            { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
            { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
            { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
            { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
            { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
            { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
            { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
            { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
            { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
            { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
            { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
            { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
        ];
    }

    function fmtJSON(obj) {
        try {
            return JSON.stringify(obj, null, 2);
        } catch (exception) {
            return obj;
        }
    }

})(window, document)