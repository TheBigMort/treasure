import * as fs from 'fs';
import { getCumStats } from '../metadata/analyzer';
import prepper from '../metadata/prepper';
describe('metadata/scripts/prepper', () => {
it('prepper', async () => {
         const res1 = prepper();
        const res2 = getCumStats();
        const res = await res1;
        await res2;

         fs.writeFileSync('./metadata/out/prep_cache.json', JSON.stringify(res, null, 3));
         
    })
/*     it('rules', async () => {
        const res = await rules();
        console.log(res.toJS().SHIELD)
    }) */
})