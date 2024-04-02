const { MarkovMachine } = require("./markov")

describe("markov machine", function(){
    test('make chains', function() {
        let mm = new MarkovMachine("a b c a c a c");

        expect(mm.chains).toEqual(new Map([
            ['a', ['b', 'c', 'c']],
            ['b', ['c']],
            ['c', ['a', 'a', null]]
        ]));
    });

    test('choice picks an index in the array', function(){
        expect(MarkovMachine.choice([1, 1, 1])).toEqual(1);
        expect([1,2,3]).toContain(MarkovMachine.choice([1,2,3]))

    });

    test('generates somewhat predictable text', function(){
        let mm = new MarkovMachine(" a b c");
        let text = mm.makeText();
        expect(['a b c', 'b c', 'c']).toContain(text);

    });

    test('ends at inputted length', function(){
        let mm = new MarkovMachine("the cat in the hat");
        let output = mm.makeText(2);
    
        let outputWords = output.split(/[ \r\n]+/);
        expect([1, 2]).toContain(outputWords.length);
    });

})