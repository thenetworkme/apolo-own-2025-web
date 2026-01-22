import { defineConfig } from 'jsrepo';

export default defineConfig({
    // React Bits registry
    registries: ['https://reactbits.dev/r'],
    // Configure where components go by type
    paths: {
        'component': 'src/components/ui',
        'util': 'src/lib',
    },
});