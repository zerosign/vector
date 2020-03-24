/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { PluginOptions, Guide } from './types';
import { LoadContext } from '@docusaurus/types';
export declare function truncate(fileString: string, truncateMarker: RegExp): string;
export declare function generateGuides(guideDir: string, { siteConfig, siteDir }: LoadContext, options: PluginOptions): Promise<Guide[]>;
export declare function linkify(fileContent: string, siteDir: string, guidePath: string, guides: Guide[]): string;
//# sourceMappingURL=guideUtils.d.ts.map