/**
 * Copyright (c) Microsoft Corporation.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { CombinedVueInstance, Vue } from 'vue/types/vue';

export declare function beforeMount(callback: (params: { hooksConfig: any }) => Promise<void>): void;
export declare function afterMount(callback: (params: { hooksConfig: any, instance: CombinedVueInstance<Vue, object, object, object, Record<never, any>> }) => Promise<void>): void;
