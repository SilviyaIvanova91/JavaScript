const {expect} = require('chai')
const {isSymmetric}  = require('./05.checkforSymmetry')

describe('Symmetry Checker', () => {
    it('works with symmetric numeric array', () => {
        expect(isSymmetric([1,2,2,1])).to.be.true
    })

    it('return false for non-symmetric numeric array', () => {
        expect(isSymmetric([1,2,3])).to.be.false
    })

    it('return false for non-array', () => {
        expect(isSymmetric(5)).to.be.false
    })
    

    it('works with symmetric odd-length array', () => {
        expect(isSymmetric([1,2,1])).to.be.true
    })

    it('works with symmetric string array', () => {
        expect(isSymmetric(['a', 'b', 'b', 'a'])).to.be.true
    })

    it('return false for string param', () => {
        expect(isSymmetric('abba')).to.be.false
    })

    it('return false for type mismamtched elements', () => {
        expect(isSymmetric([1,2,'1'])).to.be.false
    })
})