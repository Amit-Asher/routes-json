import fs from 'fs';
import { BaseRoute } from './base-route';

export class Utils {
    static capitalizeAndRemoveHighDash(str: string) {
        return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
    }

    static createFile(outfile: string, content: any) {
        const subfolders = outfile.substring(0, outfile.lastIndexOf("/"));

        // Check if the subfolders exist, and create them if they do not
        if (!fs.existsSync(subfolders)) {
            fs.mkdirSync(subfolders, { recursive: true });
        }

        // Create the file
        fs.writeFileSync(outfile, content);
    }

    /**
     * recursive builder. builds all properties to large object under baseRoute.
     * @param baseRoute BaseRoute
     * @param routes any
     */
    static buildRoutes(baseRoute: BaseRoute, routes: any) {
        for (const [route, subRoutes] of Object.entries(routes)) {
            if (subRoutes === null) {
                baseRoute.addDirectChild(route);
            } else {
                const routeCls = new BaseRoute(route, `${baseRoute.path}/${route}`, baseRoute.depth + 1);
                baseRoute.addDeepChild(routeCls);
                this.buildRoutes(routeCls, subRoutes);
            }
        }
    }
}