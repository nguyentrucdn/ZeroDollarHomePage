import { expect } from 'chai';
import { renameFileInS3 } from './renameFileInS3';
import moment from 'moment';

describe('renameFileInS3', () => {
    it('should copy the source file with correct arguments', function*(done) {
        renameFileInS3({
            copyFile: (source, dest, headers, cb) => {
                expect(source).to.equal('source.jpg');
                expect(dest).to.equal('current.jpg');
                expect(headers).to.deep.equal({
                    'x-amz-metadata-directive': 'REPLACE',
                    'Content-Type': 'image/jpeg',
                    'x-amz-acl': 'public-read',
                    'x-amz-meta-Cache-Control': 'max-age=86400',
                    'Expires': moment().endOf('day').utc().toISOString(),
                });
                cb(null, {statusCode: 200});
            },
        }, {
            currentFileUrl: 'current.jpg',
        })('source.jpg').then(done).catch(done);
    });
});
