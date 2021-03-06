import uut from '../pre';

describe('preprocess tokens', () => {
	[
		{ input: ' j  =  987', expected: 'j = 987' },
		{ input: 'j=987', expected: 'j = 987' },
		{ input: 'a+=c', expected: 'a = a + c' },
		{ input: 'a+=120', expected: 'a = a + 120' },
		{ input: '2 + ++j', expected: '2 + #{++L}j' },
		{ input: 'a+ ++h', expected: 'a + #{++L}h' },
		{ input: '2 + j++', expected: '2 + #{++R}j' },
		{ input: 'a+ h++', expected: 'a + #{++R}h' },
		{ input: 'i = 0', expected: 'i = 0' },
		{ input: 'j = i++', expected: 'j = #{++R}i' },
		{ input: 'x = i++ + 5', expected: 'x = #{++R}i + 5' },
		{ input: 'x = i++ + 514', expected: 'x = #{++R}i + 514' },
		{ input: 'y = 512+ 312 * 10', expected: 'y = 512 + 312 * 10' },
		{ input: 'i+=y', expected: 'i = i + y' },
	].forEach(testCase => {
		it('should tokenize the string', () => {
			const result = uut(testCase.input);

			expect(result).toBe(testCase.expected);
		});
	});
});
