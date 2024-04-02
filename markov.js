/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();
    // for each word in the text
    for (let i = 0; i < this.words.length; i += 1){
      // get current word and next word
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;
// if word is a key in chains, push nextWord in as a pair
      if (chains.has(word)) chains.get(word).push(nextWord);
      // otherwise, if key not in chains, set key value pair with word/nextWord
      else chains.set(word, [nextWord]);
    }
    this.chains = chains;
    console.log(this.chains)
  }


  /** return random text from chains */

  // generate a random index within the length of the array
static choice(ar){
  return ar[Math.floor(Math.random() * ar.length)];
}


  makeText(numWords = 100) {
    // make an array of keys from chains to-
    let keys = Array.from(this.chains.keys());
    // select a random key from that array
    let key = MarkovMachine.choice(keys)
    // set up the return repository
    let out = [];
    // While the length of the return is less than the input and key is not Null
    while (out.length < numWords && key != null){
      // put key into out
      out.push(key)
      // set new key to one of the values paired with current key
      key = MarkovMachine.choice(this.chains.get(key));
    }
    // return out as string with spaces in between
    return out.join(" ");
    // TODO
  }
}

module.exports = {
  MarkovMachine,
};
