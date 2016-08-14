/**
 * razor-naff-components
 * naff-switch - Toggle switch
 * @author Paul Smith (smiffy6969)
 * @site ulsmith.net
 * @licence MIT
 */
import RaziloComponent from 'razilocomponent'

export default class RaziloTest extends RaziloComponent {
	constructor() {
		super();

		this.name = 'razilo-test';

		// Properties
		this.test = 0;
	}

	attached() {
		console.log('attached');
	}

	detached() {
		console.log('detached');
	}

	attributeChanged(name, oldVal, newVal) {
		console.log('attributeChanged');
	}
}
