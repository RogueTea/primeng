import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Breadcrumb, BreadcrumbModule } from './breadcrumb';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('Breadcrumb', () => {
    let breadcrumb: Breadcrumb;
    let fixture: ComponentFixture<Breadcrumb>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([{ path: 'test', component: Breadcrumb }]), NoopAnimationsModule, BreadcrumbModule]
        });

        fixture = TestBed.createComponent(Breadcrumb);
        breadcrumb = fixture.componentInstance;
    });

    it('should display by default', () => {
        fixture.detectChanges();

        const breadcrumbEl = fixture.debugElement.query(By.css('nav')).nativeElement;
        expect(breadcrumbEl).toBeTruthy();
    });

    it('should change style and styleClass', () => {
        breadcrumb.style = { height: '300px' };
        breadcrumb.styleClass = 'Primeng ROCKS!';
        fixture.detectChanges();

        const breadcrumbEl = fixture.debugElement.query(By.css('nav'));
        expect(breadcrumbEl.nativeElement.className).toContain('Primeng ROCKS!');
        expect(breadcrumbEl.styles.height).toEqual('300px');
    });

    it('should display the home', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        fixture.detectChanges();

        const homeEl = fixture.debugElement.query(By.css('.p-breadcrumb-home'));
        expect(homeEl).toBeTruthy();
    });

    it('should change home icon', () => {
        breadcrumb.home = { icon: 'primeng' };
        fixture.detectChanges();

        const homeEl = fixture.debugElement.query(By.css('.p-breadcrumb-home')).query(By.css('span')).nativeElement;
        expect(homeEl.className).toContain('primeng');
    });

    it('should display items', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Electronics' }, { label: 'Computer' }, { label: 'Accessories' }, { label: 'Keyboard' }, { label: 'Wireless' }];
        fixture.detectChanges();

        const itemsEl = fixture.debugElement.queryAll(By.css('li a span')).map((element) => element.nativeElement);
        expect(itemsEl[1].textContent).toEqual('Electronics');
        expect(itemsEl[2].textContent).toEqual('Computer');
        expect(itemsEl[3].textContent).toEqual('Accessories');
        expect(itemsEl[4].textContent).toEqual('Keyboard');
        expect(itemsEl[5].textContent).toEqual('Wireless');
        expect(itemsEl.length).toEqual(6); // 5 items + home
    });

    it('should call itemClick when click home ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Squad' }, { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const homeEl = fixture.debugElement.query(By.css('.p-breadcrumb-home')).query(By.css('a')).nativeElement;
        homeEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should call itemClick when click item ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Squad' }, { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const squadEl = fixture.debugElement.queryAll(By.css('li a span'))[1].nativeElement;
        squadEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should call itemClick(routerLink) when click item ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [{ label: 'Squad' }, { label: 'Lionel Messi', routerLink: 'test', icon: 'pi pi-external-link' }];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const messiEl = fixture.debugElement.queryAll(By.css('li a span'))[2].nativeElement;
        messiEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should call itemClick and do nothing (item disabled) ', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            { label: 'Squad', disabled: true },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const squadEl = fixture.debugElement.queryAll(By.css('li a span'))[1].nativeElement;
        squadEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });

    it('should run command', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            {
                label: 'Squad',
                command: () => {
                    breadcrumb.styleClass = 'primengRocks!';
                }
            },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        const squadEl = fixture.debugElement.queryAll(By.css('li a span'))[1].nativeElement;
        squadEl.click();
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
        expect(breadcrumb.styleClass).toEqual('primengRocks!');
    });

    it('should call itemClick with home item', () => {
        breadcrumb.home = { icon: 'pi pi-home' };
        breadcrumb.model = [
            {
                label: 'Squad',
                command: () => {
                    breadcrumb.styleClass = 'primengRocks!';
                }
            },
            { label: 'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi', icon: 'pi pi-external-link' }
        ];
        fixture.detectChanges();

        const itemClickSpy = spyOn(breadcrumb, 'onClick').and.callThrough();
        let event = new Event('click');
        breadcrumb.onHomeClick(event);
        fixture.detectChanges();

        expect(itemClickSpy).toHaveBeenCalled();
    });
});
