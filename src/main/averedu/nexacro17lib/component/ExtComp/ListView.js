//==============================================================================
//
//  TOBESOFT Co., Ltd.
//  Copyright 2014 TOBESOFT Co., Ltd.
//  All Rights Reserved.
//
//  NOTICE: TOBESOFT permits you to use, modify, and distribute this file 
//          in accordance with the terms of the license agreement accompanying it.
//
//  Readme URL: http://www.nexacro.co.kr/legal/nexacro-public-license-readme-1.0.html	
//
//==============================================================================



if (!nexacro._ListViewCellControl)
{
    //==============================================================================
    // nexacro._ListViewCellControl
    //==============================================================================

    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
 
    // [object.inherit:create]
    nexacro._ListViewCellControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        // TODO : Component/Control Create �ּ� Argument�� �߰� Argument�� Interface ����ȭ
        nexacro._CellControl.call(this, id, left, top, width, height, right, bottom, parent);
    };

    // [object.prototype:create]
    var _pListViewCellControl = nexacro._createPrototype(nexacro._CellControl, nexacro._ListViewCellControl);
    nexacro._ListViewCellControl.prototype = _pListViewCellControl;

    // [component.typename:create]
    _pListViewCellControl._type_name = "_ListViewCellControl";
    _pListViewCellControl._is_subcontrol = true;


    //===============================================================
    // nexacro._ListViewCellControl : Inner Logic
    //===============================================================

    _pListViewCellControl._setAddedCreateInfo = function (comp, ctxt, seq)
    {
        // init cell
        this._refinfo = ctxt._cellinfo;
        this._varbind = ctxt._valuebind;
        this._view = comp._view;
        this._band = comp._band;
        this._rowidx = comp._rowidx;
        this._cellidx = ctxt._index;
        /*
        this._expand_width = 0;
        this._subComp = null;
        this._text_elem = null;
        this._curDisplayType = "";
        this._curEditDisplay = "";
        this._expandCtrl = null;
        this._isSubCell = false;
        this._disp_show = true;
        this._fakecell = false;
        this._hideInner = false;
        this._is_real_upelem = null;
        this._clickcall = false;
        this._is_clickproc = false;
        this._mouse_evt_change_pseudo = false;
        this._refresh_display = false;
        this._is_simple_control = true;
        this._use_selected_status = true;
        this._use_readonly_status = true;
        */
    };

    // [component.contents:created]          
    _pListViewCellControl.on_created_contents = function (win)
    {
        nexacro._CellControl.prototype.on_created_contents.call(this, win);

        this._updateAll();
    };
    // [component.contents:command]          
    _pListViewCellControl.on_attach_contents_handle = function (win)
    {
        nexacro._CellControl.prototype.on_attach_contents_handle.call(this, win);

        this._updateAll();
    };
    

    // [component.bind.valuebind:initprop]          
    _pListViewCellControl._onGetBindableProperties = function ()
    {
        return "text";
    };

    _pListViewCellControl._applyEditor = function (async)
    {
        // TODO : �Ʒ��������� �����Ұ�.
        /*
        if (this._editor)
        {
            this._editor._applyDataset(async);
        }
        */

        if (this._editor && this._writable && this._view && this._varbind)
        {
            var value = this._editor._input_element ?
                        this._editor._input_element.value :
                        this._editor._getValueData();
            
            this._view._setBindData(this._getDataRow(), this._varbind, value);
            this._editor._EditUpdateAll();
            this._view._getBindData(this._getDataRow());
            this._updateAll();
        }
    };

    _pListViewCellControl._getCellEditType = function ()
    {
        return this._refinfo._getEdittype(this._getDataRow());
    };
    _pListViewCellControl._getCellDisplayType = function ()
    {
        return this._refinfo._getDisplaytype(this._getDataRow());
    };
    _pListViewCellControl._getCellText = function ()
    {
        return this._refinfo._getDisplayText(this._getDataRow());
    };
    _pListViewCellControl._getCellValue = function ()
    {
        return this._refinfo._getValue(this._getDataRow());
    };

    // [component.action:getcell]
    _pListViewCellControl._getActionCell = function (from_cell)
    {
        var cellobj = from_cell;
        while (cellobj && cellobj._type_name != this._type_name)
        {
            if (cellobj == this)
            {
                break;
            }

            if (cellobj._cellobj && cellobj._cellobj._is_alive && cellobj._cellobj._type_name == this._type_name)
            {
                cellobj = cellobj._cellobj;
                break;
            }

            cellobj = cellobj.parent;
        }

        if (cellobj && cellobj._type_name == this._type_name)
        {
            if (cellobj.parentcell)
            {
                cellobj = cellobj.parentcell;
            }
        }

        return cellobj;
    };
    // [component.action:editcell]
    _pListViewCellControl._actionEditCell = function (cell, trigger)
    {
        if (!cell)
            return;

        switch (trigger)
        {
            case "setfocus":
            {
                if (cell._hasEditor() && cell._isEditable())
                {
                    cell._showEditor(true);
                }
                break;
            }
            case "killfocus":
            {
                if (cell._isShowEditor())
                {
                    cell._applyEditor(true);
                    cell._hideEditor(true);
                }
                break;
            }
            case "lbuttondown":
            case "lbuttonup":
            {
                if (cell)
                {
                    cell.setFocus(false, true);
                }
                break;
            }
            case "enterkey":
            {
                if (cell._isShowEditor())
                {
                    cell._applyEditor(true);
                }
                else if (cell._hasEditor() && cell._isEditable())
                {
                    cell._showEditor(true);
                }
                break;
            }
            case "tabkey":
            {
                if (cell._hasEditor() && cell._isEditable())
                {
                    cell._showEditor(true);
                }
                break;
            }
        }
    };

    _pListViewCellControl._isReadOnly = function ()
    {
        return this.readonly == true || this._real_readonly == true;
    };
    _pListViewCellControl._isEditable = function ()
    {
        return this.readonly != true && this._real_readonly != true;
    };
    _pListViewCellControl.set_readonly = function (v)
    {
        v = nexacro._toBoolean(v);
        if (v !== this.readonly || v !== this._real_readonly)
        {
            this.readonly = v;
            this._real_readonly = this.readonly || (this.parent ? (this.parent._real_readonly ? true : false) : false);

            this.on_apply_readonly(this._real_readonly);
        }
    };
    _pListViewCellControl.on_apply_readonly = function (readonly)
    {
        this._changeStatus("readonly", readonly);
    };

    //===============================================================
    // nexacro._ListViewCellControl : Override
    //===============================================================

    // TODO : ���� override ���� �ʰ� �ڽ��� real status�� check �ǵ��� cell/component �⺻ status ���������Ұ�
    _pListViewCellControl._isEnable = function ()
    {
        return this.parent ? this.parent._real_enable && this.enable : this.enable;
    };
    _pListViewCellControl._isEditableComponent = function ()
    {
        return this._hasEditor() && this._isEditable();
    };

    //===============================================================
    // nexacro._ListViewCellControl : Event
    //===============================================================

    // Event Handler ó���� 
    //   - �ִ��� Action+Condition�� �Ϸ������� ó��
    //   - �ִ��� ������� �ƴ� �������� ���� ó��
    //   - �ִ��� Common/Bubble ���� �ϰ������� ó��

    _pListViewCellControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

        // own basic action
        this._actionEditCell(this._getActionCell(refer_new_focus), "setfocus");
    };
    _pListViewCellControl.on_killfocus_basic_action = function (new_focus, new_refer_focus)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_killfocus_basic_action.call(this, new_focus, new_refer_focus);

        // own basic action
        this._actionEditCell(this._getActionCell(this), "killfocus");
    };


    _pListViewCellControl.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

        // own basic action
        this._actionEditCell(this._getActionCell(refer_comp), "lbuttondown");
    };
    _pListViewCellControl.on_lbuttonup_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_lbuttonup_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

        // own basic action
        this._actionEditCell(this._getActionCell(refer_comp), "lbuttonup");
    };

    /*
    _pListViewCellControl.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        return nexacro.Component.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };
    _pListViewCellControl.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        return nexacro.Component.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    }
    */

    _pListViewCellControl._checkProcessedKey = function (keycode, alt_key, ctrl_key, shift_key, check_comp, refer_comp)
    {
        return check_comp && refer_comp && refer_comp._isEditableComponent() && refer_comp._isEnable() && check_comp._isEnable();
    };

    //===============================================================
    // nexacro.ListViewBandControl : Interface Logic Override
    //===============================================================

    // [���� Component ó��]
    // �ش� interface�� ������ �䱸�ɶ� Override ó��

    // [component.dlgcode:init]                     // dlgcode ������ ������ �ʿ��ϸ� override, default�� ��� false
    _pListViewCellControl._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        return { want_tab: true, want_return: true, want_escape: true, want_chars: true, want_arrows: true };
    };
    // [component.layout.child:get]                 // TODO : normalize
    _pListViewCellControl._getChildren = function ()
    {
        return [this._subComp];
    };

    delete _pListViewCellControl;
};


if (!nexacro._ListViewBandControl)
{
    //==============================================================================
    // nexacro._ListViewBandControl
    //==============================================================================

    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
 
    // [object.inherit:create]
    nexacro._ListViewBandControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.ComplexComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
    };

    // [object.prototype:create]
    var _pListViewBandControl = nexacro._createPrototype(nexacro.ComplexComponent, nexacro._ListViewBandControl);
    nexacro._ListViewBandControl.prototype = _pListViewBandControl;

    // [component.typename:create]
    _pListViewBandControl._type_name = "_ListViewBandControl";
    _pListViewBandControl._is_subcontrol = true;

    _pListViewBandControl._use_select = true;           // Select ������ ����
    _pListViewBandControl._use_selected_status = true;  // Select ������ ����
    _pListViewBandControl._use_readonly_status = true;  // Readonly ������ ����

    _pListViewBandControl._is_scrollable = false;       // Scroll ������ ����
    _pListViewBandControl._is_expandable = true;        // Expand ������ ����

    _pListViewBandControl._is_nc_scroll = false;        // NC Scroll ���� ���� ����, Override �ʿ�.
    _pListViewBandControl._is_nc_expand = true;         // NC Expand ���� ���� ����, Override �ʿ�.
    _pListViewBandControl._use_scrollmanager = false;   // NC Scroll + Panel Overflow Partial Slot ���� �ʼ� ����, Override �ʿ�. TODO : �ʼ��Ӽ����� ����ó��
    _pListViewBandControl._use_expandmanager = true;    // NC Expand + Panel Overflow Expand Popup ���� �ʼ� ����, Override �ʿ�. TODO : �ʼ��Ӽ����� ����ó��

    _pListViewBandControl._layoutflag = 0x0003;         // TODO : Init ���� ó���� ����

    //===============================================================
    // nexacro._ListViewBandControl : Inner Logic
    //===============================================================

    _pListViewBandControl._setAddedCreateInfo = function (comp, ctxt, seq)
    {
        // init band
        this._refinfo = ctxt._bandinfo;
        this._view = comp;
        this._band = ctxt.id;
        this._rowidx = seq;
    };
    _pListViewBandControl._setChildEventHandler = function (eventid, handlerfunc, handlertarget)
    {
        // init band
        var children = this._children;

        if (children)
        {
            for (var i = 0, l = children.length; i < l; i++)
            {
                var child = children[i];

                if (child)
                    child._setEventHandler(eventid, handlerfunc, handlertarget);
            }
        }
    };


    //===============================================================
    // nexacro._ListViewBandControl : Override
    //===============================================================

    // [component.layout.formats.ctxt:create]
    _pListViewBandControl.onCreateCtxtControl = function (item, ctxt, seq)
    {
        // context control created logic
        if (item && ctxt)
        {
            // set added creation info
            item._setAddedCreateInfo(this, ctxt, seq);

            // set added event handler
            item._setEventHandler("onclick", this.on_notify_child_onclick, this);
            item._setEventHandler("onfocus", this.on_notify_child_onfocus, this);
        }

        return item;
    };

    // [component.layout.items:update]
    _pListViewBandControl.onUpdateItem = function (index, info)
    {
        // update info
        if (this._rowidx != index)
            this._rowidx = index;

        // update all cell
        /*
        var children = this._children;

        if (children)
        {
            for (var i = 0, l = children.length; i < l; i++)
            {
                var child = children[i];

                if (child && child._updateAll)
                    child._updateAll();
            }
        }
        */
    };

    //===============================================================
    // nexacro._ListViewBandControl : Property
    //===============================================================


    // [���� Component ó��]
    // Component Stock�̳� ���� Componnet�� DefaultValue�� �ٲٰ��� �ϸ� Override �Ͽ� ó��

    /*
    // [object.property:create]
  	_pComponent._initProperties = function ()
  	{
        this.stock_prop1 = DEFAULT_VALUE;           // Component Stock Normal Property Init (���⼭ �ؾ��ϳ�?)
        this.stock_prop2 = DEFAULT_VALUE;           
        
   	    onInitProperties();                         // Property �߰��� Override
  	};
    // [object.property:apply]
  	_pComponent._applyProperties = function ()
  	{
        this.on_apply_stock_prop1();                // Component Stock Normal Property Apply
        this.on_apply_stock_prop2();

   	    onApplyProperties();                        // Property �߰��� Override
  	};
    // [object.property:clear]
  	_pComponent._clearProperties = function ()
  	{
        this.on_clear_stock_prop1();                // Component Stock Normal Property Clear (��������)
        this.on_clear_stock_prop2();

   	    onClearProperties();                        // ������ clear ó���� Override
  	};
    */

    // [���� Component ó��]
    // Premitive�� Property�̸� ������ ó��
    // new/delete�� �䱸�Ǵ� Property�̸� ����/�������� ó��

    // [object.property:init]                       // Property �߰��� Override
    _pListViewBandControl.onInitProperties = function ()
    {
        // init interface prop
        /*
        */

        // init component prop
        this.expandtype = undefined;
        this.expandbartype = undefined;
        this.expandbarsize = undefined;
    };
    // [object.property:apply]                      // Property �߰��� Override
    _pListViewBandControl.onApplyProperties = function ()
    {
        // apply interface prop

        // apply component prop
        this.on_apply_expandtype();
        this.on_apply_expandbartype();
        this.on_apply_expandbarsize();
        /*
        this.on_apply_scrolltype();
        this.on_apply_scrollbartype();
        this.on_apply_scrollbarsize();
        */
    };
    // [object.property:clear]                      // ������ clear ó���� ����
    _pListViewBandControl.onClearProperties = function ()
    {
        // clear interface property

        // clear component property
        /*
        this.on_clear_expandtype();
        this.on_clear_expandbartype();
        this.on_clear_expandbarsize();
        */
        /*
        this.on_clear_scrolltype();
        this.on_clear_scrollbartype();
        this.on_clear_scrollbarsize();
        */
    };

    _pListViewBandControl.set_expandtype = function (v)
    {
        var _v = nexacro._toString(v).trim();

        if (_v != this.expandtype)
        {
            // set property value
            this.expandtype = _v;

            // apply property value
            this.on_apply_expandtype();
        }
    };
    _pListViewBandControl.on_apply_expandtype = function ()
    {
        if (!this._is_created)
            return;
        
        // [component.layout.child:recreate]
        this._recreateChild();
    };
    _pListViewBandControl.set_expandbartype = function (v)
    {
        var _v = nexacro._toString(v).trim();

        if (_v != this.expandbartype)
        {
            // set property value
            this.expandbartype = _v;

            // apply property value
            this.on_apply_expandbartype();
        }
    };
    _pListViewBandControl.on_apply_expandbartype = function ()
    {
        if (!this._is_created)
            return;
        
        // [component.layout.child:recreate]
        this._recreateChild();
    };
    _pListViewBandControl.set_expandbarsize = function (v)
    {
        var _v = nexacro._toInt(v);

        if (_v != this.expandbarsize)
        {
            // set property value
            this.expandbarsize = _v;

            // apply property value
            this.on_apply_expandbarsize();
        }
    };
    _pListViewBandControl.on_apply_expandbarsize = function ()
    {
        if (!this._is_created)
            return;
        
        // [component.layout.child:recreate]
        this._recreateChild();
    };

    //===============================================================
    // nexacro._ListViewBandControl : Event
    //===============================================================

    // Event Handler ó���� 
    //   - �ִ��� Action+Condition�� �Ϸ������� ó��
    //   - �ִ��� ������� �ƴ� �������� ���� ó��
    //   - �ִ��� Common/Bubble ���� �ϰ������� ó��

    // [component.event.items:notify]                   // Complex Component���� ó��
    /*
    _pListViewBandControl.on_notify_child_onclick = function (obj, e)
    {
        // fire event
        this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.fromobject);
    };
    // [component.event.child:notify]
    _pComplexComponent.on_notify_child_onsetfocus = function (obj, e)
    {
        // fire event
        this.on_fire_onsetfocus(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.fromobject);
    };
    // [component.event.child:notify]
    _pComplexComponent.on_notify_child_onkillfocus = function (obj, e)
    {
        // fire event
        this.on_fire_onkillfocus(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.fromobject);
    };
    */

    // [component.expand.event.expand:basicaction]      // Expand ���� ó���� override
    _pListViewBandControl._on_basic_onexpand = function (e)
    {
    //  trace("_pListViewBandControl._on_basic_onexpand");
    };
    // [component.expand.event.expand:defaultaction]    // Expand ���� ó���� override
    _pListViewBandControl._on_default_onexpand = function (e)
    {
    //  trace("_pListViewBandControl._on_default_onexpand");
    };

    //===============================================================
    // nexacro.ListViewBandControl : Interface Logic Override
    //===============================================================

    // [���� Component ó��]
    // �ش� interface�� ������ �䱸�ɶ� Override ó��

    // [component.dlgcode:init]                     // dlgcode ������ ������ �ʿ��ϸ� override, default�� ��� false
    _pListViewBandControl._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        return { want_tab: true, want_return: true, want_escape: true, want_chars: true, want_arrows: true };
    };


    delete _pListViewBandControl;
};



if (!nexacro.ListView)
{
    //==============================================================================
    // nexacro.ListViewEventInfo
    //==============================================================================
    nexacro.ListViewClickEventInfo = function (obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex, itembandid, itemcellid)
    {
        nexacro.ClickEventInfo.call(this, obj, id || "onclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

        this.fromobject = obj;
        this.fromreferenceobject = from_refer_comp;

        this.itemindex = itemindex;
        this.itembandid = itembandid;
        this.itemcellid = itemcellid;
    };

    var _pListViewClickEventInfo = nexacro._createPrototype(nexacro.ClickEventInfo, nexacro.ListViewClickEventInfo);
    nexacro.ListViewClickEventInfo.prototype = _pListViewClickEventInfo;
    _pListViewClickEventInfo._type_name = "ListViewClickEventInfo";

    nexacro.ListViewMouseEventInfo = function (obj, id, button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex, itembandid, itemcellid)
    {
        nexacro.ClickEventInfo.call(this, obj, id || "onmousemove", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY);

        this.fromobject = obj;
        this.fromreferenceobject = from_refer_comp;

        this.itemindex = itemindex;
        this.itembandid = itembandid;
        this.itemcellid = itemcellid;
    };

    var _pListViewMouseEventInfo = nexacro._createPrototype(nexacro.MouseEventInfo, nexacro.ListViewMouseEventInfo);
    nexacro.ListViewMouseEventInfo.prototype = _pListViewMouseEventInfo;
    _pListViewMouseEventInfo._type_name = "ListViewMouseEventInfo";

    delete _pListViewClickEventInfo;
    delete _pListViewMouseEventInfo;


    //==============================================================================
    // nexacro.ListView
    //==============================================================================
 
    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */

    // [object.inherit:create]
    nexacro.ListView = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.ComplexComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

        this._is_use_bind_expr_prop  = { body: null, head: null, summ: null };
        this._is_use_bind_expr_style = { body: null, head: null, summ: null };
    };

    // [object.prototype:create]
    var _pListView = nexacro._createPrototype(nexacro.ComplexComponent, nexacro.ListView);
    nexacro.ListView.prototype = _pListView;

    // [component.typename:create]
    _pListView._type_name = "ListView";

    // [component.composite.layout.formats:useset]
    _pListView._is_format_layout = true;               
    // [component.composite.layout.formats:initprop]
    _pListView.formats = "";                            // format string
    _pListView.formatid = "";                           // format id

    // [component.composite.layout.panel:useset]
    _pListView._is_panel_layout = true;

    // [component.composite.layout.items:useset]
    _pListView._is_child = false;
    _pListView._is_items = true;
    _pListView._use_headitem = false;
    _pListView._use_tailitem = false;
    _pListView._use_markitem = true;
    _pListView._use_partitem = false;
    _pListView._add_partitem = 2;
    _pListView._acc_partitem = 2;

    // [component.composite.nclayout:useset]
    _pListView._is_nc_layout = false;
    _pListView._is_nc_head = true;
    _pListView._is_nc_foot = false;
    _pListView._is_nc_lead = false;
    _pListView._is_nc_tail = false;



    //===============================================================
    // nexacro.ListView : Init
    //===============================================================

    // [component.variable:init]
    /*
    _pListView._var1 = true;
    _pListView._var2 = null;
    _pListView._var3 = false;
    */

    // [object.property:init]
    /*
    _pListView.prop1 = true;
    _pListView.prop2 = false;
    _pListView.prop3 = false;
    */

    // [component.status:init]
    /*
    _pListView._use_pushed_status = true;
    _pListView._use_selected_status = true;
    */

    // [component.accessibility:init]
    /*
    _pListView._accessibility_role = "RoleName";
    */

    // [object.event:init]
    /*
    _pListView._event_list =
    {
            "onlbuttondown": 1,
            "onlbuttonup": 1, 
            "onmouseenter": 1,
            "onmouseleave": 1,
            "onmousemove": 1,
            "onmove": 1,
            "onsize": 1,
            "onmousedown": 1,
            "onmouseup": 1,
            "ontouchstart": 1,
            "ontouchmove": 1,
            "ontouchend": 1,
            "onflingstart": 1,
            "onfling": 1,
            "onflingend": 1,
            "onpinchstart": 1,
            "onpinch": 1,
            "onpinchend": 1,
            "onlongpress": 1,
            "onslidestart": 1,
            "onslide": 1,
            "onslideend": 1
    };
    */

    //===============================================================
    // nexacro.ListView : Create/Destroy
    //===============================================================

    // [use inherit]


    //===============================================================
    // nexacro.ListView : NCChild
    //===============================================================

    // [Complex Component ó��]
    // NCChild�� Simple Component������ ó������ �ʴ´�.
    // ScrollBar/TitleBar���� Control�� NC��ġ�� ��Ͻ�Ų��.

    // [component.layout.ncchild:create]
    _pListView.onCreateNCHeadControl = function (child)
    {
        // user item create logic
        this.createNCHeadControl(new nexacro._ListViewHead("nchead", 0, 0, 0, 0, null, null, null, null, null, null, this));
    };

    //===============================================================
    // nexacro.ComplexComponent : Child
    //===============================================================

    // [component.layout.child:create]
    _pListView.onCreateChild = function ()
    {
        // child create
        /*
        if (this.headcontrol = this.createChildControl(new nexacro._ListViewHead("head", 0, 0, 0, 0, null, null, null, null, null, null, this)))
        {
            // attach event
            this.headcontrol._setEventHandler("onclick", this.on_notify_head_onclick, this);
        }
        */
    };

 

    //===============================================================
    // nexacro.ListView : Items
    //===============================================================

    // [���� Component ó��]
    // Child�� ����/���� �κ��� Override�Ͽ� ó��

    // [component.layout.items:create]
    _pListView.onCreateItemBegin = function (ctxtdata, binddata, nc)
    {
        if (!this.showhead && !this._is_subcontrol)
            return;

        // user before item create logic
        if (this.headcontrol = this.createItemControl(new nexacro._ListViewHead("head", 0, 0, 0, 0, null, null, null, null, null, null, this)))
        {
            // attach event
            this.headcontrol._setEventHandler("onclick", this.on_notify_head_onclick, this);

            return this.headcontrol;
        }
    };
    // [component.layout.items:create]
    _pListView.onCreateItemFinal = function (ctxtdata, binddata, nc)
    {
        // user after item create logic
    };
    _pListView.onCreateItem = function (ctxtdata, binddata, index, nc)
    {
        // default item create logic by ctxt
        if (this._is_format_layout && ctxtdata)
        {
            // create band control && attach context
            var item = this.createItemCtxtControl(ctxtdata, index, nc);

            return item;
        }
    };
    // [component.layout.items:destroy]
    _pListView.onDestroyItems = function ()
    {
        // unlink items
        this.headcontrol = null;
    };

    /*
    // [component.layout.items:index]
    _pListView._onSetItemIndex = function(item, index)
    {
        item._itemindex = index;
    };
    // [component.layout.items:index]
    _pListView._onGetItemIndex = function(item)
    {
        return item._itemindex;
    };
    */

    // [component.action:getitem]
    _pListView._getActionItem = function (e)
    {
        return e ? e.fromobject : null;
    };
    _pListView._getActionItemCell = function (e)
    {
        return e ? e.fromreferenceobject : null;
    };

    // [component.action:selectitem]
    _pListView._actionSelectItem = function (itemidx, subidx, cellidx, trigger)
    {
        if (!nexacro._isNumber(itemidx) || itemidx < -2 || itemidx > this.rowcount)
            return false;

        this._selectitemindex = itemidx;
        this._selectbandindex = nexacro._isNull(subidx) ? -1 : subidx;
        this._selectcellindex = nexacro._isNull(cellidx) ? -1 : cellidx;

        switch (trigger)
        {
            case "bandclick":
            case "bandfocus":
            case "expandclick":
            case "expandcall":
            {
                if (true)
                {
                    this.setSelect(itemidx, subidx);
                }
                if (true)
                {
                    this._setPanelBandToggle(itemidx);
                }
                break;
            }
            case "cellclick":
            case "cellfocus":
            {
                if (true)
                {
                    this.setSelect(itemidx, subidx);
                }
            }
        }

        return true;
    };

    //===============================================================
    // nexacro.ComplexComponent : Items/Event
    //===============================================================

    // Event Handler ó���� 
    //   - �ִ��� Action+Condition�� �Ϸ������� ó��
    //   - �ִ��� ������� �ƴ� �������� ���� ó��
    //   - �ִ��� Common/Bubble ���� �ϰ������� ó��


    // [component.event.items:notify]
    _pListView.on_notify_band_onclick = function (obj, e)
    {
    //  trace('ListView.on_notify_band_onclick');

        // TODO: Action / Action Control Syntax ���� --> Scoket Interface ������ ����
        // TODO: �Ʒ� Argument���� ��� �κ��� EventInfo Property���� ó���ǵ��� �ϰ� ����

        var item = this._getActionItem(e);
        var itemindex = this._getItemIndex(item);
        var itemsubindex = this._getItemSubIndex(item);
        var itembandid = this._getItemId(item);
        var itemcell = this._getActionItemCell(e);
        var itemcellid = item ? item._getChildId(itemcell) : "";
        var itemcellindex = item ? item._findChildIndex(itemcell) : -1;

        // action 
        this._actionSelectItem(itemindex, itemsubindex, itemcellindex, "bandclick");

        // fire event
        this.on_fire_onclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, e.fromobject, e.fromobject, itemindex, itembandid, itemcellid);
    };
    _pListView.on_notify_band_ondblclick = function (obj, e)
    {
    //  trace('ListView.on_notify_band_ondblclick');

        var item = this._getActionItem(e);
        var itemindex = this._getItemIndex(item);
        var itemsubindex = this._getItemSubIndex(item);
        var itembandid = this._getItemId(item);
        var itemcell = this._getActionItemCell(e);
        var itemcellid = item ? item._getChildId(itemcell) : "";
        var itemcellindex = item ? item._findChildIndex(itemcell) : -1;

        // fire event
        this.on_fire_ondblclick(e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, e.fromobject, e.fromobject, itemindex, itembandid, itemcellid);
    };

    _pListView.on_notify_band_onsetfocus = function (obj, e)
    {
    //  trace('ListView.on_notify_band_onsetfocus');

        var item = this._getActionItem(e);
        var itemindex = this._getItemIndex(item);
        var itemsubindex = this._getItemSubIndex(item);
        var itemcell = this._getActionItemCell(e);
        var itemcellid = item ? item._getChildId(itemcell) : "";
        var itemcellindex = item ? item._findChildIndex(itemcell) : -1;

        // fire event
        this._actionSelectItem(itemindex, itemsubindex, itemcellindex, e ? "cellfocus" : "bandfocus");
    };
    _pListView.on_notify_band_onkillfocus = function (obj, e)
    {
    //  trace('ListView.on_notify_band_onkillfocus');
    };

    // [component.event.items:notify]
    _pListView.on_notify_band_onexpand = function (obj, e)
    {
        // fire event
        this._on_basic_onexpand(obj, e);
        this._on_fire_onexpand(obj, e);
        this._on_default_onexpand(obj, e);
    };
    // [component.expand.event.expand:basicaction]
    _pListView._on_basic_onexpand = function (obj, e)
    {
    };
    // [component.expand.event.expand:defaultaction]
    _pListView._on_default_onexpand = function (obj, e)
    {
        var item = this._getActionItem(e);
        var itemindex = this._getItemIndex(item);
        var itemsubindex = this._getItemSubIndex(item);
        var itembandid = this._getItemId(item);

        // action 
        this._actionSelectItem(itemindex, itemsubindex, -1, "expandclick");
    };
    // [component.expand.event.expand:fireevent]
    _pListView._on_fire_onexpand = function (obj, e)
    {
        if (e.fromreferenceobject.type == "_ListViewCellControl")
        {
            if (this.oncellexpand && this.oncellexpand._has_handlers)
            {
                e.fromobject = this;
                this.oncellexpand._fireEvent(this, e);
            }
        }
        if (e.fromreferenceobject.type == "_ListViewBandControl")
        {
            if (this.onbandexpand && this.onbandexpand._has_handlers)
            {
                e.fromobject = this;
                this.onbandexpand._fireEvent(this, e);
            }
        }
        if (this.onexpand && this.onexpand._has_handlers)
        {
            e.fromobject = this;
            this.onexpand._fireEvent(this, e);
        }
        return true;
    };

    // [component.event.items:notify]
    _pListView.on_notify_title_onclick = function (obj, e)
    {
    //  trace('ListView.on_notify_title_onclick');
    };
    // [component.event.items:notify]
    _pListView.on_notify_title_onpopup = function (obj, e)
    {
    //  trace('ListView.on_notify_title_onpopup');

        this._setPanelGroupToggle(this._getItemIndex(e.fromobject));
    };

    //===============================================================
    // nexacro.ComplexComponent : Layout/Popup
    //===============================================================

    // [Complex Component ó��]
    // Container Element�� Panel�� ������ҷ� �̿��� Layout ��ġ�� ó���Ѵ�.
    // Panel ������ Rule Base Interface�� Socketing ������ Ȯ���Ѵ�.


    // [component.layout.panel.popup:create]        // Override ó��
    _pListView._onCreatePopup = function ()
  	{
  	    var popup = null;
       
  	    if (popup = this._createPopupControl(new nexacro._PanelPopupControl("panelpopup", 0, 0, 0, 0, null, null, null, null, null, null, this)))
  	    {
  	        return popup;
        }
  	};

    // [component.layout.panel.subgroup:create]     // Override ó��
    _pListView._onCreatePopupChild = function (slot)
  	{
  	    if (slot && this._formats)
  	    {
  	        var bandseq = this._formats._getBandSeq("detail");
  	        var popband = slot._getSlotTargetBand(bandseq);
  	        var bindidx = slot._getSlotIndex();

  	        // get ctxt/bind data
  	        var ctxtband = popband._getCtxtBaseInfo();
  	        var binddata = this._getBindData(bindidx);

  	        var child = null;
            
  	        if (child = this._createPopupChildControl(this.createCtxtControl(ctxtband)))
  	        {
  	            // set context itemindex
  	            this._setItemIndex(child, bindidx);
  	            // set context iteminfo
  	            this._setCtxtItemInfo(child, ctxtband, bindidx);
  	            // set bind iteminfo
  	            this._setBindItemInfo(child, binddata, bindidx, bandseq);
  	            // set sublayout
  	            this._setItemSubLayoutInfo(child, binddata, bindidx);

  	            return child;
  	        }
        }
  	};

    // [component.layout.panel.popup:getsize]        // Override ó��
    _pListView._onGetPopupChildSize = function (popup)
    {
        var popupband;

        if (popup && popup._getAttachedComponent)
            popupband = popup._getAttachedComponent();

        if (popupband && popupband._getContextSize)
            return popupband._getContextSize(this._getClientWidth(), this._getClientHeight());
        else
            return [this.getPixelWidth(), this.getPixelHeight()];
    };

    //===============================================================
    // nexacro.ListView : Formats
    //===============================================================

    // [���� Component ó��]
    // Formats�� Complex Component���� ����

    // [���� Component ó��]
    // override ���� property/method ����ó��

    // [component.layout.formats.config:init]
    _pListView._onInitFormatsLayout = function ()
    {
        var formats = this._formats;

        if (formats)
        {
            formats._initFormats(
                nexacro._FormatsConst.FORMATMODE_XML, 
                nexacro._FormatsConst.FORMATTYPE_POSITION,
                nexacro._FormatsConst.FORMATBIND_BIND,
                ["head"],
                ["body","detail"],
                [""],
                ["track"],
                ["track"],
                {"Band":"nexacro._ListViewBandControl", "Cell":"nexacro._ListViewCellControl"}
                );
        }
    };

    // [component.layout.formats.context.base:set] 
    _pListView._onSetCtxtBaseInfo = function ()
    {
        // make bandinfo/cellinfo
        var ctxt = this._getCtxtBaseInfo();
        var bands = ctxt ? ctxt._bands : null;

        if (bands)
        {
            for (var band in bands)
            {
                this._makeBandCellInfo(bands[band]);
            }
        }
    };
    // [component.layout.formats.context.base:clear] 
    _pListView._onClearCtxtBaseInfo = function ()
    {
        // make bandinfo/cellinfo
        var ctxt = this._getCtxtBaseInfo();
        var bands = ctxt ? ctxt._bands : null;

        if (bands)
        {
            for (var band in bands)
            {
                this._clearBandCellInfo(bands[band]);
            }
        }
    };
    _pListView._resetBandCellInfo = function (band, clearonly)
    {
        if (band)
        {
            {
                this._clearBandInfo(band);
                this._clearCellInfo(band);
            }
            if (!clearonly)
            {
                this._makeBandInfo(band);
                this._makeCellInfo(band);
            }
        }
    };
    _pListView._makeBandCellInfo = function (bands)
    {
        this._resetBandCellInfo(bands, false);
    };
    _pListView._clearBandCellInfo = function (bands)
    {
        this._resetBandCellInfo(bands, true);
    };
    _pListView._makeBandInfo = function (band)
    {
        // TODO : ������ ����Ȯ��
        /*
        band._bandinfo = new nexacro.GridBandInfo(band.id, band.id, null, this);

        this._onMakeBandInfo(band);
        */
    };
    _pListView._makeCellInfo = function (band)
    {
        for (var i = 0, l = band._items.length; i < l; i++)
        {
            band._items[i]._cellinfo = new nexacro.CellInfo(band.id + i, band._bandinfo, this, band.id, i);

            this._onMakeCellInfo(band._items[i]);
        }
    };
    _pListView._changeCellInfo = function (bandid, cellidx, propid, propval)
    {
        var ctxt = this._getCtxtBaseInfo();
        var bands = ctxt ? ctxt._bands : null;
        var band = bands ? bands[bandid] : null;

        if (band && band._items)
            return this._onChangeCellInfo(band._items[cellidx], propid, propval);
        else
            return false;
    };
    _pListView._clearBandInfo = function (band)
    {
        if (band._bandinfo)
        {
            delete band._bandinfo; 
            band._bandinfo = null;
        }
    };
    _pListView._clearCellInfo = function (band)
    {
        for (var i = 0, l = band._items.length; i < l; i++)
        {
            if (band._items[i]._cellinfo)
            {
                delete band._items[i]._cellinfo;
                band._items[i]._cellinfo = null;
            }
        }
    };

    _pListView._onMakeBandInfo = function (band)
    {

    };
    _pListView._onMakeCellInfo = function (cell)
    {
        var cellinfo = cell ? cell._cellinfo : null;
        var cellsett = cell ? cell._setts : null;
        if (cellinfo && cellsett)
        {
            for (var propid in cellsett)
            {
                var func = cellinfo["set_" + propid];
                if (func)
                    func.call(cellinfo, cell[propid]);
            }
        }
    };
    _pListView._onChangeCellInfo = function (cell, propid, propval)
    {
        var cellinfo = cell ? cell._cellinfo : null;
        if (cellinfo)
        {
            var func = cellinfo["set_" + propid];
            if (func)
            {
                func.call(cellinfo, propval);
                return true;
            }
        }
        return false;
    };

    // [component.layout.formats.context.control:create]
    _pListView.onCreateCtxtControl = function (item, ctxt, seq)
    {
        // context control created logic
        if (item && ctxt)
        {
            // set added creation info
            item._setAddedCreateInfo(this, ctxt, seq);

            item._setEventHandler("onclick", this.on_notify_band_onclick, this);
            item._setEventHandler("ondblclick", this.on_notify_band_ondblclick, this);
            item._setEventHandler("onsetfocus", this.on_notify_band_onsetfocus, this);
            item._setEventHandler("onkillfocus", this.on_notify_band_onkillfocus, this);
            item._setEventHandler("onexpand", this.on_notify_band_onexpand, this);
        }

        return item;
    };

    // [component.formats:set]   
    _pListView.set_formats = function (str)
    {
        if (this.formats != str)
        {
            // set property value
            this.formats = str;

            // [component.formats:apply]           
            this.on_apply_formats();
        }       
     };
 
     // [component.formats:apply]   
    _pListView.on_apply_formats = function ()
    {
        if (!this._is_created)
            return;

        // [component.formats:set]
        this._setFormats(this.formats);

        // [component.formats:update]
        this._updateFormats();

        // [component.formats:recreate]
        this._recreateItems();
    };

    // [component.formats:clear] 
    _pListView.on_clear_formats = function ()
    {
        this._clearFormats();
    };

    // [component.formats.formatid:set]   
    _pListView.set_formatid = function (v)
    {
        if (v && v != this.formatid)
        {
            // set property value
            this.formatid = v;

            // [component.formats.formatid:apply]
            this.on_apply_formatid();
        }
    };
    // [component.formats.formatid:apply]   
    _pListView.on_apply_formatid = function ()
    {
        if (!this._is_created)
            return;

        // [component.formats.formatid:change]  
        this._changeFormatId(this.formatid);

        // [component.formats:recreate]
        this._recreateItems();
    };
    // [component.formats.formatid:clear]   
    _pListView.on_clear_formatid = function ()
    {
        if (!this._is_created)
            return;

        // [component.formats.formatid:clear] 
        this._clearFormatId();
    };


    //===============================================================
    // nexacro.ListView : InnerBind/FullBind
    //===============================================================

    // [���� Component ó��]
    // value bind�� Simple Component �⺻���� ����
    // inner bind/full bind�� Complex Component���� ����

    // [���� Component ó��]
    // override ���� bind�� property/method ����ó��
    // bind ó���� ���� interface�� ���

    // [component.bind.fullbind:initprop]   
    _pListView._is_databind = true;
    _pListView._is_fullbind = true;
    _pListView._is_levelbind = false;
    // [component.expr.fullexpr:initprop]   
    _pListView._is_dataexpr = true;
    _pListView._is_fullexpr = true;

    /*
    // [component.bind.valuebind:init]              // value property�� ���ų� �ٸ� property�� ó���� override
    _pListView._onGetBindableProperties = function ()      // �� Properties ������??
    {
        return "value";
    };

    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pListView._onGetBindDataSource = function ()
    {
        return this.binddataset;
    };
    
    // [component.bind.databind:init]               // fullbind�� override
    _pListView._onGetCodeBindInfo = function ()
    {
        return this.createCodeBindInfo();
    };
    _pListView._onGetLevelBindInfo = function ()
    {
        return this.createLevelBindInfo();
    };
    _pListView._onGetDataBindInfos = function ()
    {
        if (this._is_databind)
            if (this._is_fullbind)
                return this._onGetFullBindInfos();
            else
                return [this.createDataBindInfo()];

        return null;
    };
    */
    
    // [component.bind.databind.event:load]   
    _pListView._callback_onload = function (obj, e)
    {
        // [component.bind.databind.event:load]   
        nexacro.ComplexComponent.prototype._callback_onload.call(this, obj, e);
        // [component.bind.rowcount:set]
        this.rowcount = this._getBindCount();
    };
    // [component.bind.databind.event:rowsetchanged]   
    _pListView._callback_onrowsetchanged = function (obj, e)
    {
        // [component.bind.databind.event:rowsetchanged]   
        nexacro.ComplexComponent.prototype._callback_onrowsetchanged.call(this, obj, e);
        // [component.bind.rowcount:set]
        this.rowcount = this._getBindCount();
    };
    /*
    // [component.bind.databind:onvaluechanged]   
    _pListView._callback_onvaluechanged = function (obj, e)
    {
        // [component.bind.databind.event:onvaluechanged]   
        nexacro.ComplexComponent.prototype._callback_onvaluechanged.call(this, obj, e);
    };
    */

    // TODO: Interface Socketing���� ���ս�ų��
    // [component.bind.fullbind:initprop]   
    _pListView.binddataset = null;
    _pListView.rowcount = 0;

    // [component.bind.fullbind.dataset:set]   
    _pListView.set_binddataset = function (dataset)
    {		
        if (this.binddataset != dataset)
    	{
            // set property value
            this.binddataset = dataset;

    	    // [component.bind.dataset:apply]           
            this.on_apply_binddataset();
		}       
    };

    // [component.bind.innerbind.dataset:apply]   
    _pListView.on_apply_binddataset = function ()
    {
        // [component.bind.dataset:set]
        this._setBindDataSource();
        // [component.bind.rowcount:set]
        this.rowcount = this._getBindCount();

        if (!this._is_created)
            return;

        // [component.bind.innerbind:recreate]   
        this._recreateItems();
    };

    // [component.bind.innerbind.binddataset:detach]   
    _pListView.on_clear_binddataset = function ()
    {
        // [component.bind.dataset:unset]
        this._clearBindDataSource();
        // [component.bind.rowcount:unset]
        this.rowcount = 0;
    };


    //===============================================================
    // nexacro.ListView : Layout/Panel
    //===============================================================

    // [component.layout.panel:init]               
    _pListView._onInitPanelLayout = function ()
  	{
        var panel = this._getPanel();

  	    if (panel)
  	    {
  	        var _partslot = this._use_partitem ? nexacro._PanelConst.SLOT_OVERFLOWTYPE_PARTSLOT
                                               : nexacro._PanelConst.SLOT_OVERFLOWTYPE_FULLSLOT;

  	        var _subgroup = this._subgroup ? this._subgroup : nexacro._PanelConst.GROUPING_SUBSTYLE_NONE;
  	        var _rowfirst = this._rowfirst ? this._rowfirst : nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST;
  	        var _arrange  = this._arrange  ? this._arrange  : nexacro._PanelConst.SLOT_ARRANGETYPE_HORZARND;
  	        var _overflow = this._overflow ? this._overflow : nexacro._PanelConst.SLOT_OVERFLOWTYPE_SCROLL;
  	        var _selector = this._selector ? this._selector : nexacro._PanelConst.SLOT_SELECTORTYPE_NONE;


  	        // TODO: RuleBased Socketing ó��
  	        panel._setLayoutType(nexacro._PanelConst.LAYOUTSTYLE_POSITION);
  	        panel._setSizeInfoRefPanel(null, nexacro._PanelConst.SIZEINFO_REFSTYLE_NOLINK);
  	        panel._setGroupingSubPanel(null, _subgroup, nexacro._PanelConst.GROUPING_SUBPLACE_NONE);
  	        panel._setSlotArrangeType(_rowfirst | _arrange);
  	        panel._setSlotOverFlowType(_overflow | _partslot);
  	        panel._setSlotSelectorType(_selector);
  	        panel._setSlotVisibleType(nexacro._PanelConst.SLOT_VISIBLETYPE_HIDESLOT);
  	        panel._setSlotAutoSizeType(nexacro._PanelConst.SLOT_AUTOSIZETYPE_DEFAULT);
        //  panel._setSlotAutoFillType(nexacro._PanelConst.SLOT_AUTOFILLTYPE_DEFAULT);
  	        panel._setSlotSizeMoveType(nexacro._PanelConst.SLOT_SIZEMOVETYPE_NONE);
        }
    };

     // [component.layout.panel:subinit]               
    _pListView._onInitSubPanelNCChildLayout = function (ncchild, panel)
    {
        // set ncchild panel link
    };
    // [component.layout.panel:subinit]               
    _pListView._onInitSubPanelChildLayout = function (child, panel)
    {
        // set parent/child panel link
    };
    // [component.layout.panel:subinit]               
    _pListView._onInitSubPanelItemsLayout = function (item, panel, binddata, index)
    {
    };
    // [component.layout.panel.popup:subinit]               
    _pListView._onInitPopupSubPanelNCChildLayout = function (parent, startindex, startlevel)
    {
    };
    // [component.layout.panel.popup:subinit]               
    _pListView._onInitPopupSubPanelChildLayout = function (parent, startindex, startlevel)
    {
    };
    // [component.layout.panel.popup:subinit]               
    _pListView._onInitPopupSubPanelItemsLayout = function (parent, startindex, startlevel)
    {
    };

    //===============================================================
    // nexacro.ListView : Layout/Split
    //===============================================================

    // [Complex Component ó��]
    // Resize Element�� Split�� ������ҷ� �̿��� Layout ũ�⺯���� ó���Ѵ�.
    // Split ������ �� Control�� ũ�⺯���� �ְ� Panel�� ���� Layout ��ó���ȴ�.

    //===============================================================
    // nexacro.ListView : Layout/Sizing
    //===============================================================

    // [Complex Component ó��]
    // Panel/Arrangemenet/Autosize/MinMax�� ����� �̿��� Layout ũ�⸦ ó���Ѵ�.
    // Arrangemenet/Autosize/MinMax�� ����� ũ�⺯���� �ְ� Panel�� ���� Layout ����ó���ȴ�.

    //===============================================================
    // nexacro.ListView : Layout/Move
    //===============================================================

    // [Complex Component ó��]
    // DragDrop�� ������ҷ� �̿��� Layout �̵������� ó���Ѵ�.
    // DragDrop ������ �� Control�� ��ġ������ �ְ� Panel�� ���� Layout ��ó���ȴ�.



    //===============================================================
    // nexacro.ListView : Scroll
    //===============================================================

    // [���� Component ó��]
    // Scroll�� �⺻���� ������ ComBase ���� ����
    // User Component������ h/v scroll event�� Override

    /*
    _pListView.scrollbartype = undefined;
    _pListView.scrolltype = "both";
    _pListView.scrollbarsize = undefined;
    _pListView.scrollindicatorsize = undefined;
    */

    // [component.composite.scroll:useset]
    _pListView._is_scrollable = true;           // Scroll ������ ����
    _pListView._is_nc_scroll = true;            // NC Scroll ���� ���� ����, Override �ʿ�.
    _pListView._use_scrollmanager = true;       // NC Scroll ���� ���� ����, Override �ʿ�.

    // [component.composite.scroll:useset]
 // _pListView._default_scrolleventthrottle = "aniframe";                   // scroll event aniframe ���� �߰�
    _pListView._default_scrollcovertype     = "auto";                       // scroll track ���� �߰�
    _pListView._default_scrolltracktype     = ["trackmoved"];               // scroll track ���� �߰�
    _pListView._default_scrolltrackalign    = ["tail tracktop"];            // scroll track ���� �߰�


    /*
    // [component.scroll.event.vscroll:fireevent]    // Scroll EventInfo ����� override
    _pComplexComponent._on_fire_onvscroll = function (obj, e)
    {
        if (this.onvscroll && this.onvscroll._has_handlers)
        {
            e.fromobject = this;
            this.onvscroll._fireEvent(this, e);
        }
        return true;
    };
 
    // [component.scroll.event.hscroll:fireevent]    // Scroll EventInfo ����� override
    _pComplexComponent._on_fire_onhscroll = function (obj, e)
    {
        if (this.onhscroll && this.onhscroll._has_handlers)
        {
            e.fromobject = this;
            this.onhscroll._fireEvent(this, e);
        }
        return true;
    };

    // [component.scroll.event.vscroll:basicaction]  // Scroll ���� ó���� override
    _pComplexComponent._on_basic_onvscroll = function (pos)
    {
    };
    // [component.scroll.event.vscroll:defaultaction]// Scroll ���� ó���� override
    _pComplexComponent._on_default_onvscroll = function (pos)
    {
        this.control_elem.setElementVScrollPos(pos);
    };
    // [component.scroll.event.vscroll:readyaction]     // Scroll ���� ó���� override
    _pComplexComponent._on_ready_onvscroll = function (pos)
    {
    };
    // [component.scroll.event.vscroll:finishaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_finish_onvscroll = function (pos)
    {
    };
    // [component.scroll.event.vscroll:Updateaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_update_onvscroll = function (pos)
    {
    };

    // [component.scroll.event.hscroll:basicaction]  // Scroll ���� ó���� override
    _pComplexComponent._on_basic_onhscroll = function (pos)
    {
    };
    // [component.scroll.event.hscroll:defaultaction]// Scroll ���� ó���� override
    _pComplexComponent._on_default_onhscroll = function (pos)
    {
        this.control_elem.setElementHScrollPos(pos);
    };
    // [component.scroll.event.hscroll:readyaction]     // Scroll ���� ó���� override
    _pComplexComponent._on_ready_onhscroll = function (pos)
    {
    };
    // [component.scroll.event.hscroll:finishaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_finish_onhscroll = function (pos)
    {
    };
    // [component.scroll.event.hscroll:Updateaction]    // Scroll ���� ó���� override
    _pComplexComponent._on_update_onhscroll = function (pos)
    {
    };
    */

    // [component.scroll.part:set]   
    _pListView.set_partscroll = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (this.partscroll != _v)
        {
            // set property value
            this.partscroll = _v;
            // set inner flag
            this._use_partitem = this.partscroll;

            // [component.scroll:apply]           
            this.on_apply_partscroll();
        }       
    };
    _pListView.on_apply_partscroll = function ()
    {
        if (!this._is_created)
            return;

        // [component.layout.items:recreaet]
        this._recreateItems();
    };
    // [component.scroll.cover:set]   
    _pListView.set_showcover = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (this.showcover != _v)
        {
            // set property value
            this.showcover = _v;
            // set inner flag
            this._setUseCoverTrack(this.showcover, this.showtrack);

            // [component.scroll:apply]           
            this.on_apply_showcover();
        }       
    };
    _pListView.on_apply_showcover = function ()
    {
        if (!this._is_created)
            return;

        // [component.layout.items:recreaet]
        if (this._use_scrollmanager && this._scrollmanager)
            this._scrollmanager._recalcLayout();
    };
    _pListView.set_showtrack = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (this.showtrack != _v)
        {
            // set property value
            this.showtrack = _v;
            // set inner flag
            this._setUseCoverTrack(this.showcover, this.showtrack);

            // [component.scroll:apply]           
            this.on_apply_showtrack();
        }       
    };
    _pListView.on_apply_showtrack = function ()
    {
        if (!this._is_created)
            return;

        // [component.layout.items:recreaet]
        if (this._use_scrollmanager && this._scrollmanager)
            this._scrollmanager._recalcLayout();
    };
    _pListView.set_tracktype = function (v)
    {
        if (this.showtrack != v)
        {
            // set property value
            this.tracktype = v;
            // set inner flag
            this._default_scrolltracktype = [this.tracktype];

            // [component.scroll:apply]           
            this.on_apply_tracktype();
        }       
    };
    _pListView.on_apply_tracktype = function ()
    {
        if (!this._is_created)
            return;

        // [component.layout.items:recreaet]
        if (this._use_scrollmanager && this._scrollmanager)
            this._scrollmanager._recalcLayout();
    };
    _pListView.set_trackalign = function (v)
    {
        if (this.showtrack != v)
        {
            // set property value
            this.trackalign = v;
            // set inner flag
            this._default_scrolltrackalign = [this.trackalign];

            // [component.scroll:apply]           
            this.on_apply_trackalign();
        }       
    };
    _pListView.on_apply_trackalign = function ()
    {
        if (!this._is_created)
            return;

        // [component.layout.items:recreaet]
        if (this._use_scrollmanager && this._scrollmanager)
            this._scrollmanager._recalcLayout();
    };

    //===============================================================
    // nexacro.ListView : Expand
    //===============================================================

    // [���� Component ó��]
    // Expand�� �⺻���� ������ ComBase ���� ����
    // User Component������ expand event�� Override

    // [component.composite.expand:useset]
    _pListView._is_expandable = false;          // Expand ������ ����
    _pListView._is_nc_expand = false;           // NC Expand ���� ���� ����, Override �ʿ�.
    _pListView._use_expandmanager = false;      // NC Expand ���� ���� ����, Override �ʿ�.


    /*
    // [component.scroll.event.vscroll:fireevent]    // Scroll EventInfo ����� override
    _pComplexComponent._on_fire_onvscroll = function (obj, e)
    {
        if (this.onvscroll && this.onvscroll._has_handlers)
        {
            e.fromobject = this;
            this.onvscroll._fireEvent(this, e);
        }
        return true;
    };
    */

    //===============================================================
    // nexacro.ListView : Select (Single/Multi)
    //===============================================================

    // [���� Component ó��]
    // Select ���� Interface ����
    // Select�� Single/Multi ���δ� Component�� Simple/Complex ���ο� ����
    // Select�� ���������� �� Component�� ������ ����

    // [component.select:init]                      // ���� interface ����
    _pListView._use_select = true;                  // Select ������ ����
    _pListView._use_selector = false;               // Selector ������ ����
    _pListView._use_multiselector = false;          // MultiSelector ������ �߰�, ���� Selector ó��
    _pListView._use_partsselector = false;          // PartsSelector ������ �߰�, ���� Selector ó��

    // [component.select:property]                  // ���� interface ����
    _pListView.multiselect = false;                 // MultiSelect ������ �߰�, Ctrl Action ó��
    _pListView.rangeselect = false;                 // RangeSelect ������ �߰�, Drag Action ó��
    /*
    _pListView.selectscrollmode = "default";        // Scroll/Select ���������� �߰�
    
    // [component.select:get]
    _pListView.getSelect() = function ()
    {
        return _selectInfo;                         // ���� member ����
    }
    // [component.select:clear]
    _pListView.clearSelect() = function ()
    {
        return _selectInfo.clear();
    }
    // [component.select:set]
    _pListView.setSelect(pos,val) = function ()
    {
        return _selectInfo.setSelect(pos,val);
    }
    // [component.select:check]
    _pListView.isAboveSelected = function ()
    {

    };
    */
    // [component.select.multiselect:set]
    _pListView.set_multiselect = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.multiselect)
        {
            // set property value
            this.multiselect = _v;

            // apply property value
            this.on_apply_multiselect();
        }
    };
    _pListView.on_apply_multiselect = function ()
    {
        if (!this._is_created)
            return;

        // [component.select:init]
        this._onInitSelect();
    };
    // [component.select.rangeselect:set]
    _pListView.set_rangeselect = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.rangeselect)
        {
            // set property value
            this.rangeselect = _v;

            // apply property value
            this.on_apply_rangeselect();
        }
    };
    _pListView.on_apply_rangeselect = function ()
    {
        if (!this._is_created)
            return;

        // [component.select:init]
        this._onInitSelect();
    };


    // [component.select:init]              // Override �ʼ�        
    _pListView._onInitSelect = function (selecttype, positcount, rangecount, multicount, unselvalue)
    {
        if (this._selectinfo)
        {
            if (!selecttype) selecttype = nexacro._SelectConst.SELECTTYPE_ITEM;
            if (!positcount) positcount = 1;
            if (!rangecount) rangecount = this.rangeselect ?  2 : 1;
            if (!multicount) multicount = this.multiselect ? -1 : 1;

            this._selectinfo._initSelect(selecttype, positcount, rangecount, multicount, unselvalue);
        }
    };


    // [component.select.event.onselect:basicaction]
    /*
    _pListView._on_basic_onselect = function (oldvalue, newvalue)
    {
        // Select Complex Comp Status
        nexacro.ComplexComponent.prototype._on_basic_onselect.call(this, oldvalue, newvalue);
    };
    // [component.select.event.onselect:defaultaction]
    _pListView._on_default_onselect = function (oldvalue, newvalue)
    {
        // Select Complex Comp Status
        nexacro.ComplexComponent.prototype._on_default_onselect.call(this, oldvalue, newvalue);
    };
    */
    // [component.select.event.onselect:fireevent]
    _pListView._on_fire_onselect = function (obj, oldvalue, newvalue)
    {
        if (this.onselectchanged && this.onselectchanged._has_handlers)
        {
            // [component.eventinfo:create]         // User EventInfo �ڵ�
            var evt = new nexacro.ChangeEventInfo(this, "onselect", oldvalue, newvalue);
            
            this.onselectchanged._fireEvent(this, evt);
        }
        return true;
    };

    // [component.selector.event.onselectorresize:defaultaction]
    _pListView._on_default_onselectorresize = function (obj, e)
    {
    //  trace("_on_default_onselectorresize:" + e.cx + "," + e.cy);
    };
    // [component.select.event.onselectorresize:fireevent]
    _pListView._on_fire_onselectorresize = function (obj, e)
    {
        if (this.onselectorresize && this.onselectorresize._has_handlers)
        {
            this.onselectorresize._fireEvent(this, e);
        }
        return true;
    };

    //===============================================================
    // nexacro.ListView : Interface Logic for Grid Band/Cell
    //===============================================================

    _pListView._getDataRow = function (rowidx)
    {
        if (rowidx >= this._rowcount)
            return -9;

        return rowidx;
    };

    _pListView._isFakeCell = function (rowidx)
    {
        if (this._rowcount <= rowidx || rowidx < -2)
            return true;

        return false;
    };

    _pListView._getAvailableRect = function (comp)
    {
        var rect = { left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0 };
        rect.left = comp._getClientLeft();
        rect.top = comp._getClientTop();
        rect.right = comp._getClientLeft() + comp._getClientWidth();
        rect.bottom = comp._getClientTop() + comp._getClientHeight();
        rect.width = comp._getClientWidth();
        rect.height = comp._getClientHeight();
        return rect;
    };

    _pListView._clearBindTypeFlag = function ()
    {
        this._is_use_bind_expr_prop.body = null;
        this._is_use_bind_expr_prop.head = null;
        this._is_use_bind_expr_prop.summ = null;
    };

    //===============================================================
    // nexacro.ListView : Interface Logic Override
    //===============================================================

    // [���� Component ó��]
    // �ش� interface�� ������ �䱸�ɶ� Override ó��

    // [component.dlgcode:init]                     // dlgcode ������ ������ �ʿ��ϸ� override, default�� ��� false
    _pListView._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        return { want_tab: true, want_return: true, want_escape: true, want_chars: true, want_arrows: true };
    };

    // [component.dragdrop:getdragdata]             // drag ���� drag data
    _pListView._onGetDragData = function ()
    {
        return this.getSelectedText();
    };

    // [component.tabstop:get]                      // Accessibility �� ���� ó���� override
    _pListView._onGetTabstop = function ()
    {
        // [component.accessibility.tabstop:get]
        if (nexacro._enableaccessibility)
        {
            var accessibility = this.accessibility;
            if (accessibility && accessibility.enable && accessibility.role == "link")
                return true;
        }
        return false;
    };

    // [component.focus:get]                        // Accessibility �� ���� ó���� override
    _pListView._onGetFocusAcceptable = function ()
    {
        // [component.accessibility.focus:get]
        return nexacro._enableaccessibility;
    };

    // [component.hotkey:action]                    // hotkey �⺻ Action ����� override
    _pListView._onHotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        // [component.hotkey:action]
        this.click();
    };


    //===============================================================
    // nexacro.ListView : Accessibility (��������)
    //===============================================================

    // [���� Component ó��]
    // ���ټ��� Interface �Ϻ� Override ó��

    // [object.accessibility.label:get]
    _pListView._onGetAccessibilityLabel = function ()
    {
        var label = this.text ? this.text : this.value;
        return label;
    };
    // [object.accessibility.role:getadd]
    _pListView._onGetAccessibilityAdditionalRole = function ()
    {
        return " addrole";
    };

    // �� ���� �߰�


    //===============================================================
    // nexacro.ListView : RTL/Locale (��������)
    //===============================================================

    // [���� Component ó��]
    // Simple Component�� RTL/Locale�� ClientElement ������θ� ó��
    // Basic Component������ ó���Ǹ� User Component������ ���� ó���� ����.

    // �� ���� �߰�


    // [���� Component ó��]
    // Basic Component������ RTL Interface �Ϻ� Override ó��

    // �� ���� �߰�


    //===============================================================
    // nexacro.ListView : Status
    //===============================================================

    // [Simple Component ó��]
    // ���´� �⺻������ Basic Component���� ��� �����ϵ��� ����
    // User Component������ �߰��� UserStatus�� ��븸 �ڵ��ϸ� Metainfo���� ����
    // ������� ���¸� �߰��Ϸ��� Property/Method Interface�� �̿��Ͽ� ó���Ѵ�.



    //===============================================================
    // nexacro.ListView : Property
    //===============================================================

    // [���� Component ó��]
    // Component Stock�̳� ���� Componnet�� DefaultValue�� �ٲٰ��� �ϸ� Override �Ͽ� ó��

    /*
    // [object.property:create]
  	_pComponent._initProperties = function ()
  	{
        this.stock_prop1 = DEFAULT_VALUE;           // Component Stock Normal Property Init (���⼭ �ؾ��ϳ�?)
        this.stock_prop2 = DEFAULT_VALUE;           
        
   	    onInitProperties();                         // Property �߰��� Override
  	};
    // [object.property:apply]
  	_pComponent._applyProperties = function ()
  	{
        this.on_apply_stock_prop1();                // Component Stock Normal Property Apply
        this.on_apply_stock_prop2();

   	    onApplyProperties();                        // Property �߰��� Override
  	};
    // [object.property:clear]
  	_pComponent._clearProperties = function ()
  	{
        this.on_clear_stock_prop1();                // Component Stock Normal Property Clear (��������)
        this.on_clear_stock_prop2();

   	    onClearProperties();                        // ������ clear ó���� Override
  	};
    */

    // [���� Component ó��]
    // Premitive�� Property�̸� ������ ó��
    // new/delete�� �䱸�Ǵ� Property�̸� ����/�������� ó��

    // [object.property:init]                       // Property �߰��� Override
    _pListView.onInitProperties = function ()
    {
        // init interface prop
        /*
        this.binddataset = null;
        this.formats = "";
        this.formatid = "";
        */

        // init component panel prop
        this.showhead = false;
        this.rowfirst = false;
        this.arrange = "default";
        this.showdetail = "none";
        this.selector = "none";

        // init component bind prop

    };
    // [object.property:apply]                      // Property �߰��� Override
    _pListView.onApplyProperties = function ()
    {
        // apply interface prop
        this.on_apply_binddataset();
        this.on_apply_formats();
        this.on_apply_formatid();

        // apply component panel prop
        this.on_apply_showhead();
        this.on_apply_showdetail();
        this.on_apply_rowfirst();
        this.on_apply_arrange();
        this.on_apply_selector();

        // apply component select prop
        /*
        this.on_apply_multiselect();
        this.on_apply_rangeselect();
        */
    };
    // [object.property:clear]                      // ������ clear ó���� ����
    _pListView.onClearProperties = function ()
    {
        // clear interface property
        this.on_clear_binddataset();
        this.on_clear_formats();
        this.on_clear_formatid();

        // clear component property
        /*
        this.on_clear_showhead();
        this.on_clear_showdetail();
        this.on_clear_rowfirst();
        this.on_clear_arrange();
        this.on_clear_selector();
        */
        // clear component select property
        /*
        this.on_clear_multiselect();
        this.on_clear_rangeselect();
        */
        // clear component status property
        /*
        this.on_clear_readonly();
        */
    };

    _pListView.set_showhead = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.showhead)
        {
            // set property value
            this.showhead = _v;

            // apply property value
            this.on_apply_showhead();
        }
    };
    _pListView.on_apply_showhead = function ()
    {
        if (!this._is_created)
            return;
        
        // [component.layout.items:recreate]
        this._recreateItems();
    };

    _pListView.set_showdetail = function (v)
    {
        if (v && v != this.showdetail)
        {
            // set property value
            this.showdetail = v;

            switch (v)
            {
                case "expand"   : this._subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_EXPAND;   break;
                case "collapse" : this._subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_COLLAPSE; break;
                case "accordion": this._subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_ACCORDION;break;
                case "popup"    : this._subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_BAND_POPUP;    break;
                case "none"     :
                default         : this._subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_NONE;          break;
            }

            // apply property value
            this.on_apply_showdetail();
        }
    };
    _pListView.on_apply_showdetail = function ()
    {
        if (!this._is_created)
            return;
        
        // [component.layout.items:recreate]
        this._recreateItems();
    };

    _pListView.set_rowfirst = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.rowfirst)
        {
            // set property value
            this.rowfirst = _v;

            if (_v)
                this._rowfirst = nexacro._PanelConst.SLOT_ARRANGETYPE_ROWFIRST;
            else
                this._rowfirst = nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST;

            // apply property value
            this.on_apply_rowfirst();
        }
    };
    _pListView.on_apply_rowfirst = function ()
    {
        if (!this._is_created)
            return;
        
        // [component.layout.items:recreate]
        this._recreateItems();
    };

    _pListView.set_arrange = function (v)
    {
        if (v && v != this.arrange)
        {
            // set property value
            this.arrange = v;

  	        var arr = this.arrange ? this.arrange.split(",") : [];

  	        for (var i = 0, l = arr.length; i < l; i++)
  	        {
  	            switch(arr[i])
  	            {
  	                case "horzlead"  : this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_HORZLEAD; break;
  	                case "horztail"  : this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_HORZTAIL; break;
  	                case "horzmiddle": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_HORZAMID; break;
  	                case "horzinvert": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_HORZINVT; break;
  	                case "horzaround": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_HORZARND; break;
  	                case "horzgapped": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_HORZGAPD; break;
  	                case "vertlead"  : this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_VERTLEAD; break;
  	                case "verttail"  : this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_VERTTAIL; break;
  	                case "vertmiddle": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_VERTAMID; break;
  	                case "vertinvert": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_VERTINVT; break;
  	                case "vertaround": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_VERTARND; break;
  	                case "vertgapped": this._arrange |= nexacro._PanelConst.SLOT_ARRANGETYPE_VERTGAPD; break;
  	            }
  	        }

            // apply property value
            this.on_apply_arrange();
        }
    };
    _pListView.on_apply_arrange = function ()
    {
        if (!this._is_created)
            return;
        
        // [component.layout.items:recreate]
        this._recreateItems();
    };

    _pListView.set_selector = function (v)
    {
        if (v && v != this.selector)
        {
            // set property value
            this.selector = v;

            var arr = this.selector ? this.selector.split(",") : [];

  	        for (var i = 0, l = arr.length; i < l; i++)
  	        {
  	            switch(arr[i])
  	            {
  	                case "line"     : this._selector |= nexacro._PanelSelectConst.TYPE_LINE; break;
  	                case "area"     : this._selector |= nexacro._PanelSelectConst.TYPE_AREA; break;
  	                case "resizer"  : this._selector |= nexacro._PanelSelectConst.ACT_RESIZER; break;
  	                case "pointer"  : this._selector |= nexacro._PanelSelectConst.ACT_POINTER; break;
  	                case "carrier"  : this._selector |= nexacro._PanelSelectConst.ACT_CARRIER; break;
  	                case "horz"     : this._selector |= nexacro._PanelSelectConst.DIR_HORZ; break;
  	                case "vert"     : this._selector |= nexacro._PanelSelectConst.DIR_VERT; break;
  	                case "inner"    : this._selector |= nexacro._PanelSelectConst.ALIGN_INNER; break;
  	                case "outer"    : this._selector |= nexacro._PanelSelectConst.ALIGN_OUTER; break;
  	                case "middle"   : this._selector |= nexacro._PanelSelectConst.ALIGN_MIDDL; break;
  	                case "parts"    : this._use_selector = true; this._use_partsselector = true; break;
  	                case "multi"    : this._use_selector = true; this._use_multiselector = true; break;
  	                case "none"     : this._use_selector = false; break;
  	            }
  	        }

            // apply property value
  	        this.on_apply_selector();
        }
    };
    _pListView.on_apply_selector = function ()
    {
        if (!this._is_created)
            return;

        // [component.layout.panel.selector:init]               
        var panel = this._getPanel();

        if (panel)
            panel._setSlotSelectorType(this._selector);

        // [component.layout.selector:recreate]
        this._recreateSelector();
    };


    //===============================================================
    // nexacro.ListView : Methods
    //===============================================================

    // [���� Component ó��]
    // Method �߰� ó��
    // Status �� ��������� �߰��ϰ��� �Ҷ����� Proeprty/Method�� ó��

    // [component.bind.dataset:set]
    _pListView.setBindDataset = function (objDataset)
    {
        return this.set_binddataset(objDataset);
    };
    // [component.bind.dataset:get]
    _pListView.getBindDataset = function ()
    {
        return this.binddataset;
    };

    // [component.formats.id:set]
    _pListView.setFormat = function (id)
    {
        return this.set_formatid(id), this._formats ? !this._formats._isInvalid() : false;
    };
    // [component.formats:get]
    _pListView.getFormatString = function ()
    {
        return this.formats;
    };
    // [component.formats:getCurrent]
    _pListView.getCurFormatString = function ()
    {
        return this._formats ? this._formats._getFormatsStringFromXml(this.formats, this.formatid) : "";
    };
    // [component.formats:makeFormat]
    _pListView.makeFormatString = function ()
    {
        return this._formats ? this._formats._makeFormatsString(this._databind, this._is_levelbind) : "";
    };
    // [component.formats:createFormat]
    _pListView.createFormat = function ()
    {
        return this.set_formats(this.makeFormatString());
    };

    // [component.formats.band:getprop]
    _pListView.getBandProperty = function (bandid, propid)
    {
        return this._formats ? this._formats._getBandProperty(bandid, propid) : undefined;
    };
    // [component.formats.band:setprop]
    _pListView.setBandProperty = function (bandid, propid, propval)
    {
        if (!this._formats || !this._formats._setBandProperty(bandid, propid, propval))
            return false;

        // [component.layout.items:recreate]
        this._recreateItems();

        return true;
    };

    // [component.formats.cell:getprop]
    _pListView.getCellProperty = function (bandid, cellidx, propid)
    {
        return this._formats ? this._formats._getBandChildProperty(bandid, cellidx, propid) : undefined;
    };
    // [component.formats.cell:setprop]
    _pListView.setCellProperty = function (bandid, cellidx, propid, propval)
    {
        // [component.formats.cell:setprop]
        if (!this._formats || !this._formats._setBandChildProperty(bandid, cellidx, propid, propval))
            return false;

        // [component.bind:resetinfo]
        this._resetBindInfo();

        // [cell.cellinfo:change]
        if (!this._changeCellInfo(bandid, cellidx, propid, propval))
            return false;

        // [component.layout.items:recreate]
        this._recreateItems();

        return true;
    };
    // [component.formats.cell:getcount]
    _pListView.getCellCount = function (bandid)
    {
        return this._formats ? this._formats._getBandChildCount(bandid) : 0;
    };
    // [component.formats.cell:getrect]
    _pListView.getCellRect = function (rowindex, subindex, cellindex)
    {
        return this._getItemChildRect(rowindex, subindex, cellindex);
    };
    // [component.formats.cell:gettext]
    _pListView.getCellText = function (rowindex, subindex, cellindex)
    {
        var cell = this._getItemChild(rowindex, subindex, cellindex);
        if (cell)
        {
            if (cell._getCellText)
                return cell._getCellText();
            else
                return cell.text;
        }
    };
    // [component.formats.cell:getvalue]
    _pListView.getCellValue = function (rowindex, subindex, cellindex)
    {
        var cell = this._getItemChild(rowindex, subindex, cellindex);
        if (cell)
        {
            if (cell._getCellValue)
                return cell._getCellValue();
            else
                return cell.value;
        }
    };

    // [component.edit:show]
    _pListView.showEditor = function (show)
    {
        var cell = this._getItemChild(this._selectitemindex, this._selectbandindex, this._selectcellindex);
        if (cell)
        {
            if (show && cell._showEditor)
                return cell._showEditor(true);

            if (!show && cell._hideEditor)
                return cell._hideEditor(true);
        }
    };
    // [component.edit:get]
    _pListView.getCurEditType = function ()
    {
        var cell = this._getItemChild(this._selectitemindex, this._selectbandindex, this._selectcellindex);
        if (cell)
        {
            if (cell._getCellEditType)
                return cell._getCellEditType();
        }
    };

    // [listview.band.expand:expand]
    _pListView.expandDetailBand = function (rowindex)
    {
        return this._actionSelectItem(rowindex, -1, -1, "expandcall");
    };

    // [listview.band.cell:focus]
    _pListView.setCellPos = function (cellindex)
    {
        if (nexacro._isNull(cellindex))
            return false;

        var cell = this._getItemChild(this._selectitemindex, this._selectbandindex, cellindex);

        if (cell && cell._isEnable() && cell.setFocus())
            return true;
        else
            return false;
    };
    _pListView.moveToNextCell = function ()
    {
        return this._selectItemKeyInfo(nexacro.Event.KEY_TAB, false, false, false);
    };
    _pListView.moveToPrevCell = function ()
    {
        return this._selectItemKeyInfo(nexacro.Event.KEY_TAB, false, false, true);
    };

    //===============================================================
    // nexacro.ListView : Events
    //===============================================================

    // [���� Component ó��]
    // �⺻ System Event Handler�� Basic Component���� ��� ó���ϸ� User Component���� ���� ������ �������� �ʴ´�.
    // ��� Event Handler�� Override ������ FireAction/DefaultAction/BasicAction Handler�� �����Ѵ�.

    /*
    // [object.event:init]
    _pComplexComponent._initEvents = function ()         // Event �߰��� Override
    {
        nexacro.SimpleComponent.prototype._initEvents.call(this);

        // [event.scroll:init]
        if (this._is_nc_scroll)
        {
            this._event_list["onhscroll"] = 1;
            this._event_list["onvscroll"] = 1;
        }
        // [event.expand:init]
        if (this._is_nc_expand)
        {
            this._event_list["onexpand"] = 1;
        }
        
        // ���� Event �߰� ��� ������ �� Override�� ����
        // this._onInitEvents();    
  	};
    */

    // [���� Component ó��]
    // �̺�Ʈ �����߰��� ���� event_list�� �������Ͽ� �߰�
    // �̺�Ʈ ���������� ������, Metainfo������ ����ó��
    // EventInfo ����, Action ����� Override ó��
    // Element �ڵ�� �ݵ�� Basic Component������ ���

    // [object.event:init]
    _pListView._initEvents = function ()           // Event �߰��� Override
    {
        nexacro.ComplexComponent.prototype._initEvents.call(this);

        // [event.expand:init]
        this._event_list["onheadclick"] = 1;
        this._event_list["onbandclick"] = 1;
        this._event_list["onnodataareaclick"] = 1;
        this._event_list["onheaddblclick"] = 1;
        this._event_list["onbanddblclick"] = 1;
        this._event_list["onnodataareadblclick"] = 1;
        this._event_list["oncellexpand"] = 1;
        this._event_list["onbandexpand"] = 1;
        this._event_list["onselectchanged"] = 1;
        this._event_list["onselectorresize"] = 1;

        // ���� Event �߰� ��� ������ �� Override�� ����
        // this._onInitEvents();    
    };
    
    // Event Handler ó���� 
    //   - �ִ��� Action+Condition�� �Ϸ������� ó��
    //   - �ִ��� ������� �ƴ� �������� ���� ó��
    //   - �ִ��� Common/Bubble ���� �ϰ������� ó��
 
    // [component.clickevent:basicaction]
    _pListView._on_basic_onclick = function (button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        // user basic action
    };
    // [component.clickevent:defaultaction]
    _pListView._on_default_onclick = function (button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY)
    {
        // user default action
    };
    // [component.clickevent:fireevent]
    _pListView.on_fire_onclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex, itembandid, itemcellid)
    {
        if (itemcellid)
        {
            if (this.oncellclick && this.oncellclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "oncellclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.oncellclick._fireEvent(this, evt);
            }
        }
        if (itemindex >= 0)
        {
            if (this.onbandclick && this.onbandclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "onbandclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.onbandclick._fireEvent(this, evt);
            }
        }
        if (itemindex == -1)
        {
            if (this.onheadclick && this.onheadclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "onheadclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.onheadclick._fireEvent(this, evt);
            }
        }
        if (itemindex == undefined || itemindex == null)
        {
            if (this.onnodataareaclick && this.onnodataareaclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "onnodataareaclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.onnodataareaclick._fireEvent(this, evt);
            }
        }

        return true;
    };
    // [component.dblclickevent:fireevent]
    _pListView.on_fire_ondblclick = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex, itembandid, itemcellid)
    {
        if (itemcellid)
        {
            if (this.oncelldblclick && this.oncelldblclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "oncelldblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.oncelldblclick._fireEvent(this, evt);
            }
        }
        if (itemindex >= 0)
        {
            if (this.onbanddblclick && this.onbanddblclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "onbanddblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.onbanddblclick._fireEvent(this, evt);
            }
        }
        if (itemindex == -1)
        {
            if (this.onheaddblclick && this.onheaddblclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "onheaddblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.onheaddblclick._fireEvent(this, evt);
            }
        }
        if (itemindex == undefined || itemindex == null)
        {
            if (this.onnodataareadblclick && this.onnodataareadblclick._has_handlers)
            {
                // [component.eventinfo:create]         // User EventInfo �ڵ�
                var evt = new nexacro.ListViewClickEventInfo(this, "onnodataareadblclick", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");
                return this.onnodataareadblclick._fireEvent(this, evt);
            }
        }

        return true;
    };

    // [component.mouseevent:fireevent]             // Event Override (�� ��������?)
    _pListView.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex, itembandid, itemcellid)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            // [event:eventinfo]                    // User EventInfo �ڵ�
            var evt = new nexacro.ListViewMouseEventInfo(rootComp, "onmouseup", alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");

            return this.onmouseup._fireSysEvent(this, evt);
        }
        return false;
    };
    // [component.mouseevent:fireevent]             // Event Override (�� ��������?)
    _pListView.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex, itembandid, itemcellid)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            // [component.eventinfo:create]         // User EventInfo �ڵ�
            var evt = new nexacro.ListViewMouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp, itemindex || -1, itembandid || "none", itemcellid || "");

            return this.onmouseup._fireUserEvent(this, evt);
        }
        return false;
    };

    // TODO : prekey ó���� default/basic action���� ó���Ұ�
    // [component.keyevent:fireevent]               // Event Override
    _pListView.on_fire_sys_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        return nexacro.ComplexComponent.prototype.on_fire_sys_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    };
    // [component.keyevent:fireevent]               // Event Override
    _pListView.on_fire_user_onkeydown = function (keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp)
    {
        return nexacro.ComplexComponent.prototype.on_fire_user_onkeydown.call(this, keycode, alt_key, ctrl_key, shift_key, fire_comp, refer_comp);
    }

    //===============================================================
    // nexacro.ListView : Accessbility
    //===============================================================

    /* ���� Component ó��
    // [object.accessibility:init]
  	_pComponent._initAccessibility = function ()    // Basic Component ���� Override
  	{
        this._accessibility_role = "RoleName";      // Basic Component ���� Role ����
    
   	    onInitAccessibility();                      // User Accessibility ó���� Override
  	};
    */

    //===============================================================
    // nexacro.ListView : Inner Logic
    //===============================================================



    delete _pListView;
};



