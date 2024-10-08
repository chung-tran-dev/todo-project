import { handleMesages, MESSAGE } from "../../constants/messages";

describe('Unit test for handleMesages function', () => {
    test('genarate E0001 message', async () => {
        expect(handleMesages(MESSAGE.E0001, ["test"])).toEqual("The test item is required");
    });

    test('genarate E0002 message', async () => {
        expect(handleMesages(MESSAGE.E0002, ["test", 100])).toEqual("The test items must be less than 100 characters");
    });

    test('genarate E0003 message', async () => {
        expect(handleMesages(MESSAGE.E0003, ["test", 10])).toEqual("The test items must be greater than 10 characters");
    });

});