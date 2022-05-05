import * as fs from 'fs';
import prepper from '../metadata/prepper';
describe('metadata/scripts/prepper', () => {
it('prepper', async () => {
         const res = await prepper();
         fs.writeFileSync('./metadata/out/prep_cache.json', JSON.stringify(res, null, 3));
         
    })
/*     it('rules', async () => {
        const res = await rules();
        console.log(res.toJS().SHIELD)
    }) */
})