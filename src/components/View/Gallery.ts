import { IGalleryData } from '../../types';
import { Component } from '../base/Component';

export class Gallery extends Component<IGalleryData> {
    set items(value: HTMLElement[]) {
        this.container.replaceChildren(...value);
    }
}
