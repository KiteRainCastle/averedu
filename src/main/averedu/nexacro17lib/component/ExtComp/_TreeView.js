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


if (!nexacro._TreeViewCellControl)
{
    //==============================================================================
    // nexacro._TreeViewCellControl
    //==============================================================================

    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
 
    // [object.inherit:create]
    nexacro._TreeViewCellControl = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro._CellControl.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
    };

    // [object.prototype:create]
    var _pTreeViewCellControl = nexacro._createPrototype(nexacro._CellControl, nexacro._TreeViewCellControl);
    nexacro._TreeViewCellControl.prototype = _pTreeViewCellControl;

    // [component.typename:create]
    _pTreeViewCellControl._type_name = "_TreeViewCellControl";
    _pTreeViewCellControl._is_subcontrol = true;

    _pTreeViewCellControl._use_selected_status = true;
    _pTreeViewCellControl._use_readonly_status = false;

    //===============================================================
    // nexacro._TreeViewCellControl : Inner Logic
    //===============================================================

    // [component.contents:create]
    _pTreeViewCellControl.on_create_contents = function ()
    {
        // [component.contents:init]
        this._setAddedCreateInfo(this.parent, this.parent._treecellinfo);

        // [component.contents:create]
        nexacro._CellControl.prototype.on_create_contents.call(this);
    };
    // [component.contents:destroy]
    _pTreeViewCellControl.on_destroy_contents = function ()
    {
        // [component.contents:destroy]
        nexacro._CellControl.prototype.on_destroy_contents.call(this);

        // [component.contents:uninit]
        this._clearAddedCreateInfo();
    };
 
    _pTreeViewCellControl._setAddedCreateInfo = function (comp, cellinfo)
    {
        // init cell
        this._refinfo = cellinfo;
        this._view = comp.parent;
        this._rowidx = comp._rowidx;
        /*
        this._band = comp._band;
        this._cellidx = ctxt._index;
        this._varbind = null;
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
        */
    };
    _pTreeViewCellControl._clearAddedCreateInfo = function ()
    {
        // clear cell
        this._refinfo = null;
        this._view = null;
        /*
        this._band = null;
        */
    };

    // [component.bind.valuebind:initprop]          
    _pTreeViewCellControl._onGetBindableProperties = function ()
    {
        return "text";
    };

    _pTreeViewCellControl._applyEditor = function (async)
    {
        // TODO : �Ʒ��������� �����Ұ�.
        /*
        if (this._editor)
        {
            this._editor._setDataset(async);
        }
        */

        if (this._editor && this._view && this._varbind)
        {
            this._view._setBindData(this._getDataRow(), this._varbind, this._editor._getValueData());
            this._editor._EditUpdateAll();
            this._view._getBindData(this._getDataRow());
        }
    };

    // [component.action:getcell]
    _pTreeViewCellControl._getActionCell = function (from_cell)
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
    _pTreeViewCellControl._actionEditCell = function (cell, trigger)
    {
        switch (trigger)
        {
            case "setfocus":
            {
                if (cell && cell._hasEditor())
                {
                    cell._showEditor(true);
                }
                break;
            }
            case "killfocus":
            {
                if (cell && cell._isShowEditor())
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
                    cell.setFocus(false, false);
                }
                break;
            }
            case "enterkey":
            {
                if (cell && cell._isShowEditor())
                {
                    cell._applyEditor(true);
                }
                break;
            }
            case "tabkey":
            {
                if (cell && cell._hasEditor())
                {
                    cell._showEditor(true);
                }
                break;
            }
        }
    };

    //===============================================================
    // nexacro._TreeViewCellControl : Override
    //===============================================================

    // TODO : �Ʒ��κ� ������ �ʵ��� cell ���������Ұ�
    /*
    _pTreeViewCellControl._isEnable = function ()
    {
        if (this._view)
            return this._view._enable;

        return true;
    };
    */

    _pTreeViewCellControl.set_treetext = function (v)
    {
        if (v && v != this.treetext)
        {
            // set property value
            this.treetext = v;

            // apply value
            this.on_apply_treetext();
        }
    };
    _pTreeViewCellControl.set_treeicon = function (v)
    {
        if (v && v != this.treeicon)
        {
            // set property value
            this.treeicon = v;

            // apply value
            this.on_apply_treeicon();
        }
    };

    _pTreeViewCellControl.on_apply_treetext = function ()
    {
        if (!this._is_created)
            return;

        if (this._subComp && this._subComp._text_ctrl)
            this._subComp._text_ctrl.set_text(this.treetext);
    };
    _pTreeViewCellControl.on_apply_treeicon = function ()
    {
        if (!this._is_created)
            return;

        if (this._subComp && this._subComp._img_ctrl)
            this._subComp._load_image(this._subComp._img_ctrl, this.treeimage);
    };

    //===============================================================
    // nexacro._TreeViewCellControl : Event
    //===============================================================

    // Event Handler ó���� 
    //   - �ִ��� Action+Condition�� �Ϸ������� ó��
    //   - �ִ��� ������� �ƴ� �������� ���� ó��
    //   - �ִ��� Common/Bubble ���� �ϰ������� ó��

    _pTreeViewCellControl.on_focus_basic_action = function (self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_focus_basic_action.call(this, self_flag, evt_name, lose_focus, refer_lose_focus, new_focus, refer_new_focus);

        // own basic action
        this._actionEditCell(this._getActionCell(refer_new_focus), "setfocus");
    };
    _pTreeViewCellControl.on_killfocus_basic_action = function (new_focus, new_refer_focus)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_killfocus_basic_action.call(this, new_focus, new_refer_focus);

        // own basic action
        this._actionEditCell(this._getActionCell(this), "killfocus");
    };


    _pTreeViewCellControl.on_lbuttondown_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_lbuttondown_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

        // own basic action
        this._actionEditCell(this._getActionCell(refer_comp), "lbuttondown");
    };
    _pTreeViewCellControl.on_lbuttonup_basic_action = function (elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp)
    {
        // def basic action
        var ret = nexacro._CellControl.prototype.on_lbuttonup_basic_action.call(this, elem, button, alt_key, ctrl_key, shift_key, canvasX, canvasY, screenX, screenY, refer_comp);

        // own basic action
        this._actionEditCell(this._getActionCell(refer_comp), "lbuttonup");
    };

    _pTreeViewCellControl.on_change_containerRect = function (width, height)
    {
        // def basic action
        nexacro._CellControl.prototype.on_change_containerRect.call(this, width, height);

        // own basic action
        this._updateAll();
    };

    delete _pTreeViewCellControl;
};


if (!nexacro._TreeViewItem)
{
    //==============================================================================
    // nexacro._TreeViewItem
    //==============================================================================

    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
 
    // [object.inherit:create]
    nexacro._TreeViewItem = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, index)
    {
        nexacro.ComplexComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);

        this._rowidx = index;
    };

    // [object.prototype:create]
    var _pTreeViewItem = nexacro._createPrototype(nexacro.ComplexComponent, nexacro._TreeViewItem);
    nexacro._TreeViewItem.prototype = _pTreeViewItem;

    // [component.typename:create]
    _pTreeViewItem._type_name = "_TreeViewItem";
    _pTreeViewItem._is_subcontrol = true;

    // [component.composite.layout.panel:useset]
    _pTreeViewItem._is_panel_layout = true;
    // [component.composite.layout:create]
    _pTreeViewItem._is_child = true;

    // [component.status:init]
    _pTreeViewItem._use_select = true;
    _pTreeViewItem._use_selected_status = true;
    

    //===============================================================
    // nexacro.ComplexComponent : Child/Create,Destroy
    //===============================================================

    // [component.contents:create]
    _pTreeViewItem.onCreateContents = function ()
    {
        // [component.contents:init]
        this._treecellinfo = this.parent._treecellinfo;

        // [component.contents:create]
        nexacro.ComplexComponent.prototype.onCreateContents.call(this);
    }

    // [component.contents:destroy]
    _pTreeViewItem.onDestroyContents = function ()
    {
        // [component.contents:destroy]
        nexacro.ComplexComponent.prototype.onDestroyContents.call(this);

        // [component.contents:uninit]
        this._treecellinfo = null;
    };

    // [component.layout.child:create]
    _pTreeViewItem.onCreateChild = function ()
    {
        // child create
        if (this.treecontrol = this.createChildControl(new nexacro._TreeViewCellControl("treecell", 0, 0, 0, 0, null, null, null, null, null, null, this)))
        {
            // attach event
            this.treecontrol._setEventHandler("onclick", this.on_notify_tree_onclick, this);
        }
    };

    // [component.layout.child:destroy]
    _pTreeViewItem.onDestroyChild = function ()
    {
        if (this.treecontrol)
        {
            // child unlink
            this.treecontrol = null;
        }
    };

    //===============================================================
    // nexacro.ComplexComponent : Child/Event
    //===============================================================

    _pTreeViewItem.on_notify_tree_onclick = function (obj, e)
    {
    //  nexacro._notify("_TreeViewItem.on_notify_tree_onclick");

        this._on_basic_onclick(obj, e);
        this._on_fire_onclick(obj, e);
        this._on_default_onclick(obj, e);
    };

    //===============================================================
    // nexacro._TreeView : Layout/Panel
    //===============================================================

    // [component.layout.panel:init]               
    _pTreeViewItem._onInitPanelLayout = function ()
  	{
        var panel = this._getPanel();

  	    if (panel)
  	    {
  	        // TODO: RuleBased Socketing ó��
  	        panel._setLayoutType(nexacro._PanelConst.LAYOUTSTYLE_ROWCOL);
  	        panel._setSizeInfoRefPanel(null, nexacro._PanelConst.SIZEINFO_REFSTYLE_NOLINK);
  	        panel._setGroupingSubPanel(null, nexacro._PanelConst.GROUPING_SUBSTYLE_NONE, nexacro._PanelConst.GROUPING_SUBPLACE_NONE);
  	        panel._setSlotArrangeType(nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST | nexacro._PanelConst.SLOT_ARRANGETYPE_VERTAMID);
  	        panel._setSlotVisibleType(nexacro._PanelConst.SLOT_VISIBLETYPE_HIDESLOT);
  	        panel._setSlotOverFlowType(nexacro._PanelConst.SLOT_OVERFLOWTYPE_SCROLL | nexacro._PanelConst.SLOT_OVERFLOWTYPE_FULLSLOT);
  	        panel._setSlotAutoSizeType(nexacro._PanelConst.SLOT_AUTOSIZETYPE_HORZFIT);
  	    //  panel._setSlotAutoFillType(nexacro._PanelConst.SLOT_AUTOFILLTYPE_DEFAULT);
  	        panel._setSlotSizeMoveType(nexacro._PanelConst.SLOT_SIZEMOVETYPE_NONE);
            
  	        panel._resetPanelColSize(0,0);
  	        panel._resetPanelRowSize(0,0);
        }
    };

    delete _pTreeViewItem;
};


if (!nexacro._TreeViewItemHead)
{
    //==============================================================================
    // nexacro._TreeViewItemHead
    //==============================================================================

    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
 
    // [object.inherit:create]
    nexacro._TreeViewItemHead = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, index)
    {
        nexacro._TreeViewItem.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, index);
    };

    // [object.prototype:create]
    var _pTreeViewItemHead = nexacro._createPrototype(nexacro._TreeViewItem, nexacro._TreeViewItemHead);
    nexacro._TreeViewItemHead.prototype = _pTreeViewItemHead;

    // [component.typename:create]
    _pTreeViewItemHead._type_name = "_TreeViewItemHead";
    _pTreeViewItemHead._is_subcontrol = true;

    // [component.composite.layout.panel:useset]
    _pTreeViewItemHead._is_panel_layout = true;
    // [component.composite.layout:create]
    _pTreeViewItemHead._is_child = true;


    //===============================================================
    // nexacro._TreeViewItemHead : Child/Create,Destroy
    //===============================================================

    // [component.layout.child:create]
    _pTreeViewItemHead.onCreateChild = function ()
    {
        // parent call
        nexacro._TreeViewItem.prototype.onCreateChild.call(this);

        // child create
        this.addcontrol = this.createChildControl(new nexacro.Button("add", 0, 0, 0, 0, null, null, null, null, null, null, this));
        this.subcontrol = this.createChildControl(new nexacro.Button("sub", 0, 0, 0, 0, null, null, null, null, null, null, this));
        this.delcontrol = this.createChildControl(new nexacro.Button("del", 0, 0, 0, 0, null, null, null, null, null, null, this));

        // attach event
        this.addcontrol._setEventHandler("onclick", this.on_notify_add_onclick, this);
        this.subcontrol._setEventHandler("onclick", this.on_notify_sub_onclick, this);
        this.delcontrol._setEventHandler("onclick", this.on_notify_del_onclick, this);
    };

    // [component.layout.child:destroy]
    _pTreeViewItemHead.onDestroyChild = function ()
    {
        // child unlink
        this.addcontrol = null;
        this.subcontrol = null;
        this.delcontrol = null;

        // parent call
        nexacro.ComplexComponent.prototype.onDestroyChild.call(this);
    };

    //===============================================================
    // nexacro._TreeViewItemHead : Child/Event
    //===============================================================

    _pTreeViewItemHead.on_notify_add_onclick = function (obj, e)
    {
        nexacro._notify("_TreeViewItemHead.on_notify_add_onclick");
    };
    _pTreeViewItemHead.on_notify_sub_onclick = function (obj, e)
    {
        nexacro._notify("_TreeViewItemHead.on_notify_sub_onclick");
    };
    _pTreeViewItemHead.on_notify_del_onclick = function (obj, e)
    {
        nexacro._notify("_TreeViewItemHead.on_notify_del_onclick");
    };

    //===============================================================
    // nexacro._TreeViewItemHead : Layout/Panel
    //===============================================================

    // [component.layout.panel:init]               
    _pTreeViewItemHead._onInitPanelLayout = function ()
  	{
  	    var panel = this._getPanel();

  	    if (panel)
  	    {
  	        // TODO: RuleBased Socketing ó��
  	        panel._setLayoutType(nexacro._PanelConst.LAYOUTSTYLE_ROWCOL);
  	        panel._setSizeInfoRefPanel(null, nexacro._PanelConst.SIZEINFO_REFSTYLE_NOLINK);
  	        panel._setGroupingSubPanel(null, nexacro._PanelConst.GROUPING_SUBSTYLE_NONE, nexacro._PanelConst.GROUPING_SUBPLACE_NONE);
  	        panel._setSlotArrangeType(nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST | nexacro._PanelConst.SLOT_ARRANGETYPE_VERTAMID);
  	        panel._setSlotVisibleType(nexacro._PanelConst.SLOT_VISIBLETYPE_HIDESLOT);
  	        panel._setSlotOverFlowType(nexacro._PanelConst.SLOT_OVERFLOWTYPE_SCROLL | nexacro._PanelConst.SLOT_OVERFLOWTYPE_FULLSLOT);
  	        panel._setSlotAutoSizeType(nexacro._PanelConst.SLOT_AUTOSIZETYPE_HORZFIT);
  	    //  panel._setSlotAutoFillType(nexacro._PanelConst.SLOT_AUTOFILLTYPE_DEFAULT);
  	        panel._setSlotSizeMoveType(nexacro._PanelConst.SLOT_SIZEMOVETYPE_NONE);
            
  	        panel._resetPanelColSizeArray(4, [undefined,20,20,20], 100);
  	        panel._resetPanelRowSize(0,0);
        }
    };

    delete _pTreeViewItemHead;
};


if (!nexacro._TreeViewItemBranch)
{
    //==============================================================================
    // nexacro._TreeViewItemBranch
    //==============================================================================

    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */
 
    // [object.inherit:create]
    nexacro._TreeViewItemBranch = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, index)
    {
        nexacro._TreeViewItemHead.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent, index);
    };

    // [object.prototype:create]
    var _pTreeViewItemBranch = nexacro._createPrototype(nexacro._TreeViewItemHead, nexacro._TreeViewItemBranch);
    nexacro._TreeViewItemBranch.prototype = _pTreeViewItemBranch;

    // [component.typename:create]
    _pTreeViewItemBranch._type_name = "_TreeViewItemBranch";
    _pTreeViewItemBranch._is_subcontrol = true;

    // [component.composite.layout.panel:useset]
    _pTreeViewItemBranch._is_panel_layout = true;
    // [component.composite.layout:create]
    _pTreeViewItemBranch._is_child = true;


    //===============================================================
    // nexacro._TreeViewItemBranch : Child/Create,Destroy
    //===============================================================

    // [component.layout.child:create]
    _pTreeViewItemBranch.onCreateChild = function ()
    {
        // parent call
        nexacro._TreeViewItemHead.prototype.onCreateChild.call(this);
    };

    // [component.layout.child:destroy]
    _pTreeViewItemBranch.onDestroyChild = function ()
    {
        // parent call
        nexacro._TreeViewItemHead.prototype.onDestroyChild.call(this);
    };


    //===============================================================
    // nexacro._TreeViewItemBranch : Child/Event
    //===============================================================

    // [component.event:init]
    _pTreeViewItemBranch._initEvents = function ()     // Event �߰��� Override
    {
        this._event_list =
        {
            "onclick": 1, "ondblclick": 1, "onkillfocus": 1, "onsetfocus": 1,
            "oninput": 1, "onkeydown": 1, "onkeyup": 1,
            "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
            "onmousedown": 1, "onmouseup": 1,
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1,
            "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
            "onmove": 1, "onsize": 1, "oncontextmenu": 1,
            "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,

            // [event:init]
            "onadd": 1, "onsub": 1, "ondel": 1
            // [event/]
        };
    };

    // [component.event.child:notify]
    _pTreeViewItemBranch.on_notify_add_onclick = function (obj, e)
    {
    //  nexacro._notify("_TreeViewItemBranch.on_notify_add_onclick");

        this._on_basic_onadd(obj, e);
        this._on_fire_onadd(obj, e);
        this._on_default_onadd(obj, e);

        return true;
    };
    _pTreeViewItemBranch.on_notify_sub_onclick = function (obj, e)
    {
    //  nexacro._notify("_TreeViewItemBranch.on_notify_sub_onclick");

        this._on_basic_onsub(obj, e);
        this._on_fire_onsub(obj, e);
        this._on_default_onsub(obj, e);

        return true;
    };
    _pTreeViewItemBranch.on_notify_del_onclick = function (obj, e)
    {
    //  nexacro._notify("_TreeViewItemBranch.on_notify_del_onclick");

        this._on_basic_ondel(obj, e);
        this._on_fire_ondel(obj, e);
        this._on_default_ondel(obj, e);

        return true;
    };
    // [component.event.add:basicaction]
    _pTreeViewItemBranch._on_basic_onadd = function (obj, e)
    {
    };
    // [component.event.add:defaultaction]
    _pTreeViewItemBranch._on_default_onadd = function (obj, e)
    {
    };
    // [component.event.add:fireevent]
    _pTreeViewItemBranch._on_fire_onadd = function (obj, e)
    {
        return this._fire_event(this.onadd, obj, e);
    };
    // [component.event.sub:basicaction]
    _pTreeViewItemBranch._on_basic_onsub = function (obj, e)
    {
    };
    // [component.event.sub:defaultaction]
    _pTreeViewItemBranch._on_default_onsub = function (obj, e)
    {
    };
    // [component.event.sub:fireevent]
    _pTreeViewItemBranch._on_fire_onsub = function (obj, e)
    {
        return this._fire_event(this.onsub, obj, e);
    };
    // [component.event.del:basicaction]
    _pTreeViewItemBranch._on_basic_ondel = function (obj, e)
    {
    };
    // [component.event.del:defaultaction]
    _pTreeViewItemBranch._on_default_ondel = function (obj, e)
    {
    };
    // [component.event.del:fireevent]
    _pTreeViewItemBranch._on_fire_ondel = function (obj, e)
    {
        return this._fire_event(this.ondel, obj, e);
    };

    //===============================================================
    // nexacro._TreeViewItemBranch : Layout/Panel
    //===============================================================

    // [component.layout.panel:init]               
    _pTreeViewItemBranch._onInitPanelLayout = function ()
  	{
        // parent call
        nexacro._TreeViewItemHead.prototype._onInitPanelLayout.call(this);
    };

    delete _pTreeViewItemBranch;
};


if (!nexacro._TreeView)
{
    //==============================================================================
    // nexacro._TreeView
    //==============================================================================
 
    /* template comment
    // [interface:status]               : template code inteface comment
    // [interface.subinterface:status]  : sub interface comment
    // [interface/]                     : close comment
    */

    // [object.inherit:create]
    nexacro._TreeView = function (id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent)
    {
        nexacro.ComplexComponent.call(this, id, left, top, width, height, right, bottom, minwidth, maxwidth, minheight, maxheight, parent);
    };

    // [object.prototype:create]
    var _pTreeView = nexacro._createPrototype(nexacro.ComplexComponent, nexacro._TreeView);
    nexacro._TreeView.prototype = _pTreeView;

    // [component.typename:create]
    _pTreeView._type_name = "_TreeView";

    // [component.composite.layout.formats:useset]
    _pTreeView._is_format_layout = false;               // TODO:formats�� ����ó��
    // [component.composite.layout.formats:initprop]
    _pTreeView.formats = "";                            // format string
    _pTreeView.formatid = "";                           // format id

    // [component.composite.layout.panel:useset]
    _pTreeView._is_panel_layout = true;

    // [component.composite.layout.items:useset]
    _pTreeView._is_child = false;
    _pTreeView._is_items = true;

    // [component.composite.nclayout:useset]
    _pTreeView._is_nc_layout = false;
    _pTreeView._is_nc_head = false;
    _pTreeView._is_nc_foot = false;
    _pTreeView._is_nc_lead = false;
    _pTreeView._is_nc_tail = false;

    // [component.composite.scroll:useset]
    _pTreeView._is_scrollable = true;
    _pTreeView._is_nc_scroll = true;            // NC Scroll ���� ���� ����, Override �ʿ�.
    _pTreeView._use_scrollmanager = false;      // NC Scroll ���� ���� ����, Override �ʿ�.
    _pTreeView._use_translate_move = true;

    // [component.composite.expand:useset]
    _pTreeView._is_nc_expand = false;           // NC Expand ���� ���� ����, Override �ʿ�.
    _pTreeView._use_expandmanager = false;      // NC Expand ���� ���� ����, Override �ʿ�.




    //===============================================================
    // nexacro._TreeView : Init
    //===============================================================

    // [component.variable:init]
    /*
    _pTreeView._var1 = true;
    _pTreeView._var2 = null;
    _pTreeView._var3 = false;
    */

    // [object.property:init]
    /*
    _pTreeView.prop1 = true;
    _pTreeView.prop2 = false;
    _pTreeView.prop3 = false;
    */

    // [component.status:init]
    /*
    _pTreeView._use_pushed_status = true;
    _pTreeView._use_selected_status = true;
    */

    // [component.accessibility:init]
    /*
    _pTreeView._accessibility_role = "RoleName";
    */

    // [object.event:init]
    /*
    _pTreeView._event_list =
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
    // nexacro._TreeView : Create/Destroy
    //===============================================================

    // [use inherit]


    //===============================================================
    // nexacro._TreeView : NCChild
    //===============================================================

    //===============================================================
    // nexacro._TreeView : Child
    //===============================================================

    //===============================================================
    // nexacro._TreeView : Items
    //===============================================================

    // [���� Component ó��]
    // Child�� ����/���� �κ��� Override�Ͽ� ó��

    // [component.contents:create]
    _pTreeView.onCreateContents = function ()
    {
        // [component.contents:init]
        this._treecellinfo = new nexacro.CellInfo("tree", null, this, "body", 0);
        this._treecellinfo.set_displaytype("tree");
        this._treecellinfo.set_edittype("tree");

        // [component.contents:create]
        nexacro.ComplexComponent.prototype.onCreateContents.call(this);
    }

    // [component.contents:destroy]
    _pTreeView.onDestroyContents = function ()
    {
        // [component.contents:destroy]
        nexacro.ComplexComponent.prototype.onDestroyContents.call(this);

        // [component.contents:uninit]
        delete this._treecellinfo;
    };
   

    // [component.layout.items:create]
    _pTreeView.onCreateItemBegin = function (ctxtdata, binddata)
    {
        if (!this.showhead && !this._is_subcontrol)
            return;

         // user before item create logic
        if (this.headcontrol = this.createItemControl(new nexacro._TreeViewItemHead("head", 0, 0, 0, 0, null, null, null, null, null, null, this)))
        {
            // attach event
            this.headcontrol._setEventHandler("onclick", this.on_notify_head_onclick, this);

            return this.headcontrol;
        }
    };
    // [component.layout.items:create]
    _pTreeView.onCreateItemFinal = function (ctxtdata, binddata)
    {
        // user after item create logic
    };
    _pTreeView.onCreateItem = function (ctxtdata, binddata, index)
    {
        // user item create logic
        if (binddata && this.subgroup != "none")
        {
            var level = binddata._getLevelValue();  // level
            var group = binddata._getGroupValue();  // group
            var item = null;

            // range : branch
            if (group)
            {
                if (item = this.createItemControl(new nexacro._TreeViewItemBranch("branch" + index, 0, 0, 0, 0, null, null, null, null, null, null, this, index), index))
                {
                    if (this.useeditbutton != "unuse")
                    {
                        // attach event
                        item._setEventHandler("onclick", this.on_notify_branch_onclick, this);
                        item._setEventHandler("onadd", this.on_notify_branch_onadd, this);
                        item._setEventHandler("onsub", this.on_notify_branch_onsub, this);
                        item._setEventHandler("ondel", this.on_notify_branch_ondel, this);
                    }
                    if (this.useeditbutton != "show")
                    {
                        // hide control
                        item.addcontrol.set_visible(false);
                        item.subcontrol.set_visible(false);
                        item.delcontrol.set_visible(false);
                    }

                    return item;
                }
            }
            // range : leaf
            else
            {
                if (item = this.createItemControl(new nexacro._TreeViewItem("item" + index, 0, 0, 0, 0, null, null, null, null, null, null, this, index), index))
                {
                    // attach event
                    item._setEventHandler("onclick", this.on_notify_item_onclick, this);

                    return item;
                }
            }
        }
    };

    // [component.layout.items:destroy]
    _pComplexComponent.onDestroyItems = function ()
    {
        // unlink items
        this.headcontrol = null;
    };

    //===============================================================
    // nexacro.ComplexComponent : Items/Event
    //===============================================================

    // [component.event.items:notify]
    _pTreeView.on_notify_item_onclick = function (obj, e)
    {
    //  nexacro._notify('_TreeView.on_notify_item_onclick');

        this._on_basic_onclick(obj, e);
        this._on_fire_onclick(obj, e);
        this._on_default_onclick(obj, e);
    };
    _pTreeView.on_notify_branch_onclick = function (obj, e)
    {
    //  nexacro._notify('_TreeView.on_notify_branch_onclick');

        this._on_basic_onclick(obj, e);
        this._on_fire_onclick(obj, e);
        this._on_default_onclick(obj, e);
    };

    // [component.event.items.control:notify]
    _pTreeView.on_notify_branch_onadd = function (obj, e)
    {
    //  nexacro._notify('_TreeView.on_notify_branch_onadd');

        this._on_basic_onadd(obj, e);
        this._on_fire_onadd(obj, e);
        this._on_default_onadd(obj, e);
    };
    _pTreeView.on_notify_branch_onsub = function (obj, e)
    {
    //  nexacro._notify('_TreeView.on_notify_branch_onsub');

        this._on_basic_onsub(obj, e);
        this._on_fire_onsub(obj, e);
        this._on_default_onsub(obj, e);
    };
    _pTreeView.on_notify_branch_ondel = function (obj, e)
    {
    //  nexacro._notify('_TreeView.on_notify_branch_ondel');

        this._on_basic_ondel(obj, e);
        this._on_fire_ondel(obj, e);
        this._on_default_ondel(obj, e);
    };

    //===============================================================
    // nexacro._TreeView : Tree
    //===============================================================

    // [CellControl Tree ó���� Logic]
    // ���� CellInfo->Grid�� Tree Logic�� �⺻������ ���յǵ��� ó������
    // TODO : CellInfo�� Grid�� Tree Logic ����ó��
    // TODO : �Ʒ� Tree Function -> Tree Interface�� ��ȯ�Ͽ� �������� �̵�
    //        TreeCheck Data -> TreeInferface.Check -> MultiSelect/DataBind
    //        TreeStats Data -> TreeInferface.Stats -> PanelStatus/DataBind
    //        TreeLevel Data -> TreeInferface.Level -> PanelLevel/LevelBind
    //        TreeText  Data -> TreeInferface.Text  -> DataBind

    _pTreeView._setTreeCellinfo = function (v)
    {
        if (this._treeCellinfo != v)
        {
            this._treeCellinfo = v;
            this._setTree(true);
        }
    };

    _pTreeView._removeTreeCellinfo = function (v)
    {
        if (this._treeCellinfo == v)
        {
            this._treeCellinfo = null;
            this._setTree(false);
        }
    };

    _pTreeView._setTree = function (v)
    {
        v = nexacro._toBoolean(v);

        if (this._hasTree != v)
        {
            this._hasTree = v;

            if (v == true)
                this._initTreeStats();
            else
                this._clearTreeStats();
        }
    };

    _pTreeView._initTreeStats = function ()
    {
        this._treeStats = [];
        this._treeCheck = [];
        this._treeLevel = [];

        this._treeStatsBindIndex = -1;
        this._treeCheckBindIndex = -1;
        this._treeLevelBindIndex = -1;
    };

    _pTreeView._clearTreeStats = function ()
    {
        this._treeStats = null;
        this._treeCheck = null;
        this._treeLevel = null;
    };

    _pTreeView._getTreeStats = function (rowidx)
    {
        var ret = 1;
        var arr = this._treeStats;

        if (arr)
        {
            if (arr.length <= rowidx)
                arr.length = this._getBindCount();

            if ((ret = arr[rowidx]) == undefined)
                ret = arr[rowidx] = this._getBindTreeStats(rowidx);
        }

        return ret;
    };
    _pTreeView._setTreeStats = function (rowidx, data)
    {
        var arr = this._treeStats;

        if (arr)
        {
            if (arr.length <= rowidx)
                arr.length = this._getBindCount();

            if (arr[rowidx] != data)
                this._setBindTreeStats(rowidx, arr[rowidx] = data);
        }

        return data;
    };

    _pTreeView._getTreeCheck = function (rowidx)
    {
        var ret = 0;
        var arr = this._treeCheck;

        if (arr)
        {
            if (arr.length <= rowidx)
                arr.length = this._getBindCount();

            if ((ret = arr[rowidx]) == undefined)
                ret = arr[rowidx] = this._getBindTreeCheck(rowidx);
        }

        return ret;
    };
    _pTreeView._setTreeStats = function (rowidx, data)
    {
        var arr = this._treeCheck;

        if (arr)
        {
            if (arr.length <= rowidx)
                arr.length = this._getBindCount();

            if (arr[rowidx] != data)
                this._setBindTreeCheck(rowidx, arr[rowidx] = data);
        }

        return data;
    };

    _pTreeView._getTreeLevel = function (rowidx)
    {
        var ret = 0;
        var arr = this._treeLevel;

        if (arr)
        {
            if (arr.length <= rowidx)
                arr.length = this._getBindCount();

            if ((ret = arr[rowidx]) == undefined)
                ret = arr[rowidx] = this._getBindTreeLevel(rowidx);
        }

        return ret;
    };
    _pTreeView._setTreeLevel = function (rowidx, data)
    {
        var arr = this._treeLevel;

        if (arr)
        {
            if (arr.length <= rowidx)
                arr.length = this._getBindCount();

            if (arr[rowidx] != data)
                this._setBindTreeLevel(rowidx, arr[rowidx] = data);
        }

        return data;
    };

    _pTreeView._getBindTreeStats = function (rowidx)
    {
        // get databind "status"
        return this._treeStatsBindIndex >= 0 ? this._fetchDataBindValue(rowidx, this._treeStatsBindIndex) : 1;
    };
    _pTreeView._getBindTreeCheck = function (rowidx)
    {
        // get databind "check" + multi select
        return this._treeCheckBindIndex >= 0 ? this._fetchDataBindValue(rowidx, this._treeCheckBindIndex) : this.isAboveSelected(rowidx);
    };
    _pTreeView._getBindTreeLevel = function (rowidx)
    {
        // get databind "level" + get levelbind
        return this._treeLevelBindIndex >= 0 ? this._fetchDataBindValue(rowidx, this._treeLevelBindIndex) : this._fetchLevelBindValue(rowidx);
    };

    _pTreeView._setBindTreeStats = function (rowidx, data)
    {
        // set databind "status"
        return this._treeStatsBindIndex >= 0 ? this._setBindData(rowidx, this._getDataBindInfo(this._treeStatsBindIndex), data) : 1;
    };
    _pTreeView._setBindTreeCheck = function (rowidx, data)
    {
        // set databind "check" + multi select
        return this._treeCheckBindIndex >= 0 ? this._setBindData(rowidx, this._getDataBindInfo(this._treeCheckBindIndex), data) : this.setSelect(rowidx);
    };
    _pTreeView._setBindTreeLevel = function (rowidx, data)
    {
        // set databind "level" + set levelbind
        return this._treeLevelBindIndex >= 0 ? this._setBindData(rowidx, this._getDataBindInfo(this._treeLevelBindIndex), data) : this._setBindData(rowidx, this._getLevelBindInfo(), data);
    };
    //===============================================================
    // nexacro._TreeView : Scroll
    //===============================================================

    // [���� Component ó��]
    // Scroll�� �⺻���� ������ ComBase ���� ����
    // User Component������ h/v scroll event�� Override

    /*
    _pTreeView._is_scrollable = true;
    _pTreeView._is_nc_scroll = true;            // NC Scroll ���� ���� ����, Override �ʿ�.
    _pTreeView._use_scrollmanager = false;      // NC Scroll ���� ���� ����, Override �ʿ�.
    _pTreeView._use_translate_move = true;

    _pTreeView.scrollbartype = undefined;
    _pTreeView.scrolltype = "both";
    _pTreeView.scrollbarsize = undefined;
    _pTreeView.scrollindicatorsize = undefined;
    */

    /*
    // [component.scroll.event.vscroll:fireevent]    // Scroll EventInfo ����� override
    _pComplexComponent._on_fire_onvscroll = function (obj, e)
    {
        return this._fire_event(this.onvscroll, obj, e);
    };
 
    // [component.scroll.event.hscroll:fireevent]    // Scroll EventInfo ����� override
    _pComplexComponent._on_fire_onhscroll = function (obj, e)
    {
        return this._fire_event(this.onhscroll, obj, e);
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

    // [component.scroll.event.hscroll:basicaction]  // Scroll ���� ó���� override
    _pComplexComponent._on_basic_onhscroll = function (pos)
    {
    };
    // [component.scroll.event.hscroll:defaultaction]// Scroll ���� ó���� override
    _pComplexComponent._on_default_onhscroll = function (pos)
    {
        this.control_elem.setElementHScrollPos(pos);
    };
    */

    //===============================================================
    // nexacro._TreeView : Layout/Panel
    //===============================================================

    // [component.layout.panel:init]               
    _pTreeView._onInitPanelLayout = function ()
  	{
        var panel = this._getPanel();

  	    if (panel)
  	    {
            // TODO: Property Ȯ���� ����
  	        var rowfirst = this.rowfirst ? nexacro._PanelConst.SLOT_ARRANGETYPE_ROWFIRST : nexacro._PanelConst.SLOT_ARRANGETYPE_COLFIRST;
  	        var arrange = nexacro._PanelConst.SLOT_ARRANGETYPE_HORZLEAD | nexacro._PanelConst.SLOT_ARRANGETYPE_VERTLEAD;
  	        var subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND;

  	        switch (this.subgroup)
  	        {
  	            case "collpase" : subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_COLLAPSE; break;
  	            case "expand"   : subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_EXPAND; break;
  	            case "popup"    : subgroup = nexacro._PanelConst.GROUPING_SUBSTYLE_GROUP_POPUP; break;
            }

  	        // TODO: RuleBased Socketing ó��
  	        panel._setLayoutType(nexacro._PanelConst.LAYOUTSTYLE_ROWCOL);
  	        panel._setSizeInfoRefPanel(null, nexacro._PanelConst.SIZEINFO_REFSTYLE_NOLINK);
  	        panel._setGroupingSubPanel(null, subgroup, nexacro._PanelConst.GROUPING_SUBPLACE_NONE);
  	        panel._setSlotArrangeType(rowfirst | arrange);
  	        panel._setSlotVisibleType(nexacro._PanelConst.SLOT_VISIBLETYPE_HIDESLOT);
  	        panel._setSlotOverFlowType(nexacro._PanelConst.SLOT_OVERFLOWTYPE_SCROLL | nexacro._PanelConst.SLOT_OVERFLOWTYPE_FULLSLOT);
  	        panel._setSlotAutoSizeType(nexacro._PanelConst.SLOT_AUTOSIZETYPE_HORZFIT);
  	    //  panel._setSlotAutoFillType(nexacro._PanelConst.SLOT_AUTOFILLTYPE_DEFAULT);
  	        panel._setSlotSizeMoveType(nexacro._PanelConst.SLOT_SIZEMOVETYPE_NONE);

  	        var rowsize = this.rowsize;
  	        var colsize = this.colsize;

  	        if (colsize && colsize.length)
  	            panel._resetPanelColSizeArray(colsize.length, colsize);
            else
  	            panel._resetPanelColSize(0);

  	        if (rowsize && rowsize.length)
  	            panel._resetPanelRowSizeArray(rowsize.length, rowsize, this._itemheight, this.showhead ? 1 : 0);
            else
                panel._resetPanelRowSize(0);

  	        panel._setPanelTitleSize(this._titleheight);
  	    //  panel._setPanelSplitSize(this._splitheight);
        }
    };

     // [component.layout.panel:subinit]               
    _pTreeView._onInitSubPanelNCChildLayout = function (ncchild, panel)
    {
        // set ncchild panel link
    };
    // [component.layout.panel:subinit]               
    _pTreeView._onInitSubPanelChildLayout = function (child, panel)
    {
        // set parent/child panel link
    };
    // [component.layout.panel:subinit]               
    _pTreeView._onInitSubPanelItemsLayout = function (item, panel, binddata, index)
    {
    };
    // [component.layout.panel.popup:subinit]               
    _pTreeView._onInitPopupSubPanelNCChildLayout = function (parent, startindex, startlevel)
    {
    };
    // [component.layout.panel.popup:subinit]               
    _pTreeView._onInitPopupSubPanelChildLayout = function (parent, startindex, startlevel)
    {
    };
    // [component.layout.panel.popup:subinit]               
    _pTreeView._onInitPopupSubPanelItemsLayout = function (parent, startindex, startlevel)
    {
    };

    //===============================================================
    // nexacro.ComplexComponent : Layout/Popup
    //===============================================================

    // [Complex Component ó��]
    // Container Element�� Panel�� ������ҷ� �̿��� Layout ��ġ�� ó���Ѵ�.
    // Panel ������ Rule Base Interface�� Socketing ������ Ȯ���Ѵ�.

    //===============================================================
    // nexacro._TreeView : Layout/Split
    //===============================================================

    // [Complex Component ó��]
    // Resize Element�� Split�� ������ҷ� �̿��� Layout ũ�⺯���� ó���Ѵ�.
    // Split ������ �� Control�� ũ�⺯���� �ְ� Panel�� ���� Layout ��ó���ȴ�.

    //===============================================================
    // nexacro._TreeView : Layout/Sizing
    //===============================================================

    // [Complex Component ó��]
    // Panel/Arrangemenet/Autosize/MinMax�� ����� �̿��� Layout ũ�⸦ ó���Ѵ�.
    // Arrangemenet/Autosize/MinMax�� ����� ũ�⺯���� �ְ� Panel�� ���� Layout ����ó���ȴ�.

    //===============================================================
    // nexacro._TreeView : Layout/Move
    //===============================================================

    // [Complex Component ó��]
    // DragDrop�� ������ҷ� �̿��� Layout �̵������� ó���Ѵ�.
    // DragDrop ������ �� Control�� ��ġ������ �ְ� Panel�� ���� Layout ��ó���ȴ�.



    //===============================================================
    // nexacro._TreeView : Formats
    //===============================================================

    // [���� Component ó��]
    // Formats�� Complex Component���� ����

    // [���� Component ó��]
    // override ���� property/method ����ó��

    //===============================================================
    // nexacro._TreeView : InnerBind/FullBind
    //===============================================================

    // [���� Component ó��]
    // value bind�� Simple Component �⺻���� ����
    // inner bind/full bind�� Complex Component���� ����

    // [���� Component ó��]
    // override ���� bind�� property/method ����ó��
    // bind ó���� ���� interface�� ���

    // [component.bind.databind:initprop]   
    _pTreeView._is_databind = true;
    _pTreeView._is_fullbind = false;
    _pTreeView._is_levelbind = true;
    // [component.bind.ctxtbind:initprop]   
    _pTreeView._is_xmlbind = true;
    _pTreeView._is_jsonbind = true;

    /*
    // [component.bind.valuebind:init]              // value property�� ���ų� �ٸ� property�� ó���� override
    _pTreeView._onGetBindableProperties = function ()      // �� Properties ������??
    {
        return "value";
    };
    */

    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetBindDataSource = function ()
    {
        return this.binddatasource;
    };
    /*
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetBindDataKey = function ()
    {
        // return datactxt key string
        return "*";
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetCodeColumn = function ()
    {
        return this.codecolumn;
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetCodeProp = function ()
    {
        return "codecolumn";
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetLevelColumn = function ()
    {
        return this.levelcolumn;
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetLevelProp = function ()
    {
        return "levelcolumn";
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetGroupColumn = function ()
    {
        return this.groupcolumn;
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetGroupProp = function ()
    {
        return "groupcolumn";
    };
    */

    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetDataColumns = function ()
    {
        return  [
                this.datacolumn ? this.datacolumn : "#nodename",
                this.iconcolumn ? this.iconcolumn : ""
                ];
    };
    // [component.bind.databind:init]               // innerbind/fullbind�� override
    _pTreeView._onGetDataProps = function ()
    {
        return ["datacolumn","iconcolumn"];
    };

    // [component.bind.databind:init]               // innerbind�� override
    /*
    _pTreeView._onGetCodeBindInfo = function ()
    {
        return this.createCodeBindInfo();
    };
    _pTreeView._onGetLevelBindInfo = function ()
    {
        return this.createLevelBindInfo();
    };
    */
    _pTreeView._onGetDataBindInfos = function ()
    {
        return  [
                this.createItemSubControlBindInfo("treecontrol", "treetext", "datacolumn"),
                this.createItemSubControlBindInfo("treecontrol", "treeicon", "iconcolumn")
                ];
    };

    /*
    // [component.bind.innerbind.event:load]   
    _pTreeView._callback_onload = function (obj, e)
    {
        if (e.reason == 0)
        {
            // [component.bind.innerbind.event:load]   
            this._recreateItems();
        }
    };
    // [component.bind.innerbind.event:rowsetchanged]   
    _pTreeView._callback_onrowsetchanged = function (obj, e)
    {
    	if (e.reason != 41)  //nexacro.Dataset.REASON_ENABLEEVENT  : enableevent �� fire rowsetchanged -> valuechanged 
    	{
    	    // [component.bind.innerbind.event:load]   
    	    this._recreateItems();
    	}
    };
    // [component.bind.innerbind:rowsetchanged]   
    _pTreeView._callback_onvaluechanged = function (obj, e)
    {
    //  if (e.reason == 0)
        {
            if (this._is_databind && this._is_created)
            {
                // [component.bind.innerbind.event:load]   
                this._recreateItems();
            }
        }
    };
    */

    // TODO: Interface Socketing���� ���ս�ų��
    // [component.bind.ctxtbind.datasource:initprop]   
    _pTreeView.binddatasource = null;
    _pTreeView.codecolumn = "";
    _pTreeView.datacolumn = "";
    _pTreeView.levelcolumn = "";
    _pTreeView.iconcolumn = "";

    // [component.bind.ctxtbind.datasource:set]   
    _pTreeView.set_binddatasource = function (str)
    {		
        if (this.binddatasource != str)
    	{
            // set property value
            this.binddatasource = str;

    	    // [component.bind.dataset:apply]           
            this.on_apply_binddatasource();
		}       
    };

    // [component.bind.ctxtbind.datasource:apply]   
    _pTreeView.on_apply_binddatasource = function ()
    {
        // [component.bind.datasource:set]
        this._setBindDataSource();

        if (!this._is_created)
            return;

        // [component.layout.items:recreate] 
        this._recreateItems();
    };

    // [component.bind.ctxtbind.binddataset:detach]   
    _pTreeView.on_clear_binddatasource = function ()
    {
        this._clearBindDataSource();
    };

    // [component.bind.ctxtbind.codecolumn:set]   
    _pTreeView.set_codecolumn = function (v)
    {
        if (v && v != this.codecolumn)
        {
            // set property value
            this.codecolumn = v;

            // [component.bind.codecolumn:apply]
            this.on_apply_codecolumn();
        }
    };
    // [component.bind.ctxtbind.levelcolumn:set]   
    _pTreeView.set_levelcolumn = function (v)
    {
        if (v && v != this.levelcolumn)
        {
            // set property value
            this.levelcolumn = v;

            // [component.bind.levelcolumn:apply]
            this.on_apply_levelcolumn();
        }
    };
    // [component.bind.ctxtbind.groupcolumn:set]   
    _pTreeView.set_groupcolumn = function (v)
    {
        if (v && v != this.groupcolumn)
        {
            // set property value
            this.groupcolumn = v;

            // [component.bind.groupcolumn:apply]
            this.on_apply_groupcolumn();
        }
    };
    // [component.bind.ctxtbind.datacolumn:set]   
    _pTreeView.set_datacolumn = function (v)
    {
        if (v && v != this.datacolumn)
        {
            // set property value
            this.datacolumn = v;

            // [component.bind.datacolumn:apply]
            this.on_apply_datacolumn();
        }
    };
    // [component.bind.ctxtbind.datacolumn:set]   
    _pTreeView.set_iconcolumn = function (v)
    {
        if (v && v != this.iconcolumn)
        {
            // set property value
            this.iconcolumn = v;

            // [component.bind.datacolumn:apply]
            this.on_apply_iconcolumn();
        }
    };

    // [component.bind.ctxtbind.codecolumn:apply]   
    _pTreeView.on_apply_codecolumn = function ()
    {
        // [component.bind.codecolumn:set]
        this._setCodeColumn();

        if (!this._is_created)
            return;

        // [component.valuebind:change]  
        this._applyValue();
    };
    // [component.bind.ctxtbind.levelcolumn:apply]   
    _pTreeView.on_apply_levelcolumn = function ()
    {
        // [component.bind.levelcolumn:set]
        this._setLevelColumn();

        if (!this._is_created)
            return;

        // [component.layout.items:recreate]
        this._recreateItems();
    };
    // [component.bind.ctxtbind.groupcolumn:apply]   
    _pTreeView.on_apply_groupcolumn = function ()
    {
        // [component.bind.groupcolumn:set]
        this._setGroupColumn();

        if (!this._is_created)
            return;

        // [component.layout.items:recreate]
        this._recreateItems();
    };
    // [component.bind.ctxtbind.datacolumn:apply]   
    _pTreeView.on_apply_datacolumn = function ()
    {
        // [component.bind.datacolumn:set]
        this._setDataColumn();

        if (!this._is_created)
            return;

        // [component.layout.items:recreate]
        this._recreateItems();
    };
    // [component.bind.ctxtbind.datacolumn:apply]   
    _pTreeView.on_apply_iconcolumn = function ()
    {
        // [component.bind.datacolumn:set]
        this._setDataColumn();

        if (!this._is_created)
            return;

        // [component.layout.items:recreaet]
        this._recreateItems();
    };

    // [component.bind.ctxtbind.codecolumn:clear]   
    _pTreeView.on_clear_codecolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.ctxtbind.codecolumn:clear]   
        this._clearCodeColumn();
    };
    // [component.bind.ctxtbind.levelcolumn:clear]   
    _pTreeView.on_clear_levelcolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.ctxtbind.levelcolumn:clear]   
        this._clearLevelColumn();
    };
    // [component.bind.ctxtbind.groupcolumn:clear]   
    _pTreeView.on_clear_groupcolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.ctxtbind.groupcolumn:clear]   
        this._clearLevelColumn();
    };
    // [component.bind.ctxtbind.datacolumn:clear]   
    _pTreeView.on_clear_datacolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.ctxtbind.datacolumn:clear]   
        this._clearDataColumn();
    };
    // [component.bind.ctxtbind.datacolumn:clear]   
    _pTreeView.on_clear_iconcolumn = function ()
    {
        if (!this._is_created)
            return;

        // [component.bind.ctxtbind.datacolumn:clear]   
        this._clearDataColumn();
    };

    // [component.bind.ctxtbind:set]   
    _pTreeView._setCtxtString = function (str)
    {
        // [component.bind.ctxtbind.datasource:set]    
        return this.set_binddatasource(str);
    };
    // [component.bind.ctxtbind:get]   
    _pTreeView._getCtxtString = function ()
    {
        // [component.bind.ctxtbind.datasource:get]   
        return this._fetchBindDataCtxStr();
    };
    // [component.bind.ctxtbind:get]   
    _pTreeView._getCtxtObject = function ()
    {
        // [component.bind.ctxtbind.datasource:get]   
        return this._fetchBindDataCtxObj();
    };
    // [component.bind.ctxtbind:fetch]   
    _pTreeView._getCtxtRow = function (index)
    {
        // [component.bind.ctxtbind.datasource:get]   
        return this._getBindRow(index ? index : this.getSelect());
    };
    // [component.bind.ctxtbind:add]   
    _pTreeView._addCtxtRow = function (index, item)
    {
        // [component.bind.ctxtbind.datasource:add]   
        return this._appendBindRow(index ? index : this.getSelect(), item);
    };
    // [component.bind.ctxtbind:ins]   
    _pTreeView._insCtxtRow = function (index, item)
    {
        // [component.bind.ctxtbind.datasource:ins]   
        return this._insertBindRow(index ? index : this.getSelect(), item);
    };
    // [component.bind.ctxtbind:sub]   
    _pTreeView._subCtxtRow = function (index, item, last)
    {
        // [component.bind.ctxtbind.datasource:sub]
        return this._subsetBindRow(index ? index : this.getSelect(), item, last);
    };
    // [component.bind.ctxtbind:add]
    _pTreeView._delCtxtRow = function (index, item)
    {
        // [component.bind.ctxtbind.datasource:add]   
        return this._deleteBindRow(index ? index : this.getSelect());
    };
    // [component.bind.ctxtbind:find]
    _pTreeView._findCtxtRow = function (attr, data)
    {
        // [component.bind.ctxtbind.datasource:find]   
        return this._searchBindRow(attr, data);
    };
    _pTreeView._getCtxtAttr = function (index, attr)
    {
        // [component.bind.ctxtbind.datasource:get]   
        return this._getBindColumn(index, attr);
    };
    _pTreeView._setCtxtAttr = function (index, attr, data)
    {
        // [component.bind.ctxtbind.datasource:set]   
        return this._setBindColumnByID(index, attr, data);
    };

    //===============================================================
    // nexacro._TreeView : Select (Single/Multi)
    //===============================================================

    // [���� Component ó��]
    // Select ���� Interface ����
    // Select�� Single/Multi ���δ� Component�� Simple/Complex ���ο� ����
    // Select�� ���������� �� Component�� ������ ����

    // [component.select:init]                      // ���� interface ����
    _pTreeView._use_select = true;                  // Select ������ ����
    /*
    // [component.select:init]                      // ���� interface ����
    _pTreeView.multiselect = false;                // MultiSelect ������ �߰�, Ctrl Action ó��
    _pTreeView.rangeselect = false;                // RangeSelect ������ �߰�, Drag Action ó��
    _pTreeView.selectscrollmode = "default";       // Scroll/Select ���������� �߰�

    // [component.select:get]
    _pTreeView.getSelect() = function ()
    {
        return _selectInfo;                         // ���� member ����
    }
    // [component.select:clear]
    _pTreeView.clearSelect() = function ()
    {
        return _selectInfo.clear();
    }
    // [component.select:set]
    _pTreeView.setSelect(pos,val) = function ()
    {
        return _selectInfo.setSelect(pos,val);
    }
    // [component.select:check]
    _pTreeView.isAboveSelected = function ()
    {

    };
    // [component.select:change]
    _pTreeView._onGetCurrentSelectPos() = function ()
    {
        return [pos];                               // select data ������ component���� �ٸ�
        return [pos1,pos2];
        return [pos1,pos2,pos3];
    }
    // [component.select:chagerange]
    _pTreeView._onGetCurrentSelectStartPos() = function ()
    {
        return [pos];
        return [pos1,pos2];
        return [pos1,pos2,pos3];
    }
    // [component.select:changerange]
    _pTreeView._onGetCurrentSelectEndPos() = function ()
    {
        return [pos];
        return [pos1,pos2];
        return [pos1,pos2,pos3];
    }
    */
    //===============================================================
    // nexacro._TreeView : Interface Logic Override
    //===============================================================

    // [���� Component ó��]
    // �ش� interface�� ������ �䱸�ɶ� Override ó��
    /*
    // [component.dlgcode:init]                     // dlgcode ������ ������ �ʿ��ϸ� override, default�� ��� false
    _pTreeView._onGetDlgCode = function (keycode, altKey, ctrlKey, shiftKey)
    {
        return { want_tab: true, want_return: true, want_escape: true, want_chars: true, want_arrows: true };
    };

    // [component.dragdrop:getdragdata]             // drag ���� drag data
    _pTreeView._onGetDragData = function ()
    {
        return this.getSelectedText();
    };

    // [component.tabstop:get]                      // Accessibility �� ���� ó���� override
    _pTreeView._onGetTabstop = function ()
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
    _pTreeView._onGetFocusAcceptable = function ()
    {
        // [component.accessibility.focus:get]
        return nexacro._enableaccessibility;
    };

    // [component.hotkey:action]                    // hotkey �⺻ Action ����� override
    _pTreeView._onHotkey = function (keycode, altKey, ctrlKey, shiftKey)
    {
        // [component.hotkey:action]
        this.click();
    };
    */

    //===============================================================
    // nexacro._TreeView : Accessibility (��������)
    //===============================================================

    // [���� Component ó��]
    // ���ټ��� Interface �Ϻ� Override ó��

    /* ���� Component ó��
    // [object.accessibility:init]
  	_pComponent._initAccessibility = function ()    // Basic Component ���� Override
  	{
        this._accessibility_role = "RoleName";      // Basic Component ���� Role ����
    
   	    onInitAccessibility();                      // User Accessibility ó���� Override
  	};
    */

    /*
    // [object.accessibility.label:get]
    _pTreeView._onGetAccessibilityLabel = function ()
    {
        var label = this.text ? this.text : this.value;
        return label;
    };
    // [object.accessibility.role:getadd]
    _pTreeView._onGetAccessibilityAdditionalRole = function ()
    {
        return " addrole";
    };
    */

    //===============================================================
    // nexacro._TreeView : RTL/Locale (��������)
    //===============================================================

    // [���� Component ó��]
    // Simple Component�� RTL/Locale�� ClientElement ������θ� ó��
    // Basic Component������ ó���Ǹ� User Component������ ���� ó���� ����.

    // �� ���� �߰�


    // [���� Component ó��]
    // Basic Component������ RTL Interface �Ϻ� Override ó��

    // �� ���� �߰�


    //===============================================================
    // nexacro._TreeView : Status
    //===============================================================

    // [Simple Component ó��]
    // ���´� �⺻������ Basic Component���� ��� �����ϵ��� ����
    // User Component������ �߰��� UserStatus�� ��븸 �ڵ��ϸ� Metainfo���� ����
    // ������� ���¸� �߰��Ϸ��� Property/Method Interface�� �̿��Ͽ� ó���Ѵ�.



    //===============================================================
    // nexacro._TreeView : Property
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
    _pTreeView.onInitProperties = function ()
    {
        // init interface prop
        /*
        this.innerdataset = null;
        this.codecolumn = "";
        this.datacolumn = "";
        this.levelcolumn = "";
        this.groupcolumn = "";
        */
        this.showhead = false;
        this.showsummary = false;
        this.subgroup = 0;

        this.rootusehead = false;       // true:head item by root(first) item,  false:head item by head bind info
        this.leafusebranch = false;     // true:leaf item use brach item,       false:leaf item by leaf item

        this.useedittext = "unuse";     // "unuse":none,    "use":edit,     "useselect":edit autoenter
        this.useeditbutton = "show";   // "unuse":none,    "use":show,     "usecurrent":show currentrow
        this.useeditnewrow = "unuse";   // "unuse":none,    "use":always add last empty new row

        this.treeusebutton = "use";     
        this.treeusecheckbox = false;
        this.treeuseimage = false;

        this.rowsize = this.showhead ? [30, 24] : [24];
        this.colsize = [];

        this._itemheight = 30;
        this._titleheight = 30;
    };
    // [object.property:apply]                      // Property �߰��� Override
    _pTreeView.onApplyProperties = function ()
    {
        this.on_apply_binddatasource();
        this.on_apply_codecolumn();
        this.on_apply_levelcolumn();
        this.on_apply_groupcolumn();
        this.on_apply_datacolumn();
        this.on_apply_iconcolumn();
    };
    // [object.property:clear]                      // ������ clear ó���� ����
    _pTreeView.onClearProperties = function ()
    {
        // clear property
        this.on_clear_binddatasource();
        this.on_clear_codecolumn();
        this.on_clear_levelcolumn();
        this.on_clear_groupcolumn();
        this.on_clear_datacolumn();
        this.on_clear_iconcolumn();
    };

    _pTreeView.set_showhead = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.showhead)
        {
            // set property value
            this.showhead = _v;
        }
    };
    _pTreeView.set_showsummary = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.showsummary)
        {
            // set property value
            this.showsummary = _v;
        }
    };
    _pTreeView.set_subgroup = function (v)
    {
        if (v && v != this.subgroup)
        {
            // set property value
            this.subgroup = v;
        }
    };

    _pTreeView.set_rootusehead = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.rootusehead)
        {
            // set property value
            this.rootusehead = _v;
        }
    };
    _pTreeView.set_leafusebranch = function (v)
    {
        var _v = nexacro._toBoolean(v);

        if (_v != this.leafusebranch)
        {
            // set property value
            this.leafusebranch = _v;
        }
    };
    _pTreeView.set_treeusebutton = function (v)
    {
        if (v && v != this.treeusebutton)
        {
            // set property value
            this.treeusebutton = v;
        }
    };
    _pTreeView.set_treeusecheck = function (v)
    {
        if (v && v != this.treeusecheck)
        {
            // set property value
            this.treeusecheck = v;
        }
    };
    _pTreeView.set_treeuseimage = function (v)
    {
        if (v && v != this.treeuseimage)
        {
            // set property value
            this.treeuseimage = v;
        }
    };

    _pTreeView.set_rowsize = function (v)
    {
        if (v && v != this.rowsize)
        {
            // set property value
            this.rowsize = JSON.parse(v);
        }
    };
    _pTreeView.set_colsize = function (v)
    {
        if (v && v != this.colsize)
        {
            // set property value
            this.colsize = JSON.parse(v);
        }
    };

    //===============================================================
    // nexacro._TreeView : Methods
    //===============================================================

    // [���� Component ó��]
    // Method �߰� ó��
    // Status �� ��������� �߰��ϰ��� �Ҷ����� Proeprty/Method�� ó��
    /*
    // [method:call]
    _pTreeView.click = function ()
    {
        // method user logic

        // [event:call]
        this.on_fire_click("none", false, false, false, -1, -1, -1, -1, -1, -1, this, this);
    };

    // [method:get]
    _pTreeView.getAMethod = function ()
    {
        // [property:get]
        return this._A;
    };

    // [method:set]
    _pTreeView.setAStatus = function (v)
    {
        // [property:set]
        var ret = this._A;
        this._A = v;

        // [status:change]
        this._changeUserStatus("Status1", v);

        return ret;
    };
    */

    //===============================================================
    // nexacro._TreeView : Events
    //===============================================================

    // [���� Component ó��]
    // �⺻ System Event Handler�� Basic Component���� ��� ó���ϸ� User Component���� ���� ������ �������� �ʴ´�.
    // ��� Event Handler�� Override ������ FireAction/DefaultAction/BasicAction Handler�� �����Ѵ�.

    /*
    // [object.event:init]
  	_pComponent._initEvents = function ()           // Event �߰��� Override
  	{
        this._event_list =
        {
            "onclick": 1, "ondblclick": 1, "onkillfocus": 1, "onsetfocus": 1,
            "oninput": 1, "onkeydown": 1, "onkeyup": 1,
            "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
            "onmousedown": 1, "onmouseup": 1,
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1,
            "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
            "onmove": 1, "onsize": 1, "oncontextmenu": 1,
            "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1
        };
        
   	//  _onInitEvents();                            // ���� Event �߰� ��� ������ �� Override�� ����
  	};
    */

    // [���� Component ó��]
    // �̺�Ʈ �����߰��� ���� event_list�� �������Ͽ� �߰�
    // �̺�Ʈ ���������� ������, Metainfo������ ����ó��
    // EventInfo ����, Action ����� Override ó��
    // Element �ڵ�� �ݵ�� Basic Component������ ���

    // [object.event:init]
    _pTreeView._initEvents = function ()           // Event �߰��� Override
    {
        this._event_list =
        {
            "onclick": 1, "ondblclick": 1, "onkillfocus": 1, "onsetfocus": 1,
            "oninput": 1, "onkeydown": 1, "onkeyup": 1,
            "onlbuttondown": 1, "onlbuttonup": 1, "onrbuttondown": 1, "onrbuttonup": 1,
            "onmousedown": 1, "onmouseup": 1,
            "onmouseenter": 1, "onmouseleave": 1, "onmousemove": 1, "onmousewheel": 1,
            "ondrag": 1, "ondragenter": 1, "ondragleave": 1, "ondragmove": 1, "ondrop": 1,
            "onmove": 1, "onsize": 1, "oncontextmenu": 1,
            "ontouchstart": 1, "ontouchmove": 1, "ontouchend": 1,

            // [event:init]
            "onselect": 1, "onadd": 1, "onsub": 1, "ondel": 1
            // [event/]
        };

    //  _onInitEvents();                            // ���� Event �߰� ��� ������ �� Override�� ����
    };

    // [component.clickevent:basicaction]
    _pTreeView._on_basic_onclick = function (obj, e)
    {
        // user basic action

        // TODO: Action / Action Control Syntax ���� --> Scoket Interface ������ ����
        this.setSelect(this._getItemIndex(e.fromobject));
    };
    // [component.clickevent:defaultaction]
    _pTreeView._on_default_onclick = function (obj, e)
    {
        // user default action
    };
    // [component.clickevent:fireevent]
    /*
    _pTreeView._on_fire_onclick = function (obj, e)
    {
        if (this.onclick && this.onclick._has_handlers)
        {
            // [component.eventinfo:create]         // User EventInfo �ڵ�
            return this.onclick._fireEvent(this, new nexacro.ClickEventInfo(this, "onclick", e.button, e.alt_key, e.ctrl_key, e.shift_key, e.screenX, e.screenY, e.canvasX, e.canvasY, e.clientX, e.clientY, this, e.from_refer_comp));
        }
        return true;
    };
    */

    // [component.event.add:basicaction]
    _pTreeView._on_basic_onadd = function (obj, e)
    {
    };
    // [component.event.add:defaultaction]
    _pTreeView._on_default_onadd = function (obj, e)
    {
    };
    // [component.event.add:fireevent]
    _pTreeView._on_fire_onadd = function (obj, e)
    {
        return this._fire_event(this.onadd, obj, e);
    };
    // [component.event.sub:basicaction]
    _pTreeView._on_basic_onsub = function (obj, e)
    {
    };
    // [component.event.sub:defaultaction]
    _pTreeView._on_default_onsub = function (obj, e)
    {
    };
    // [component.event.sub:fireevent]
    _pTreeView._on_fire_onsub = function (obj, e)
    {
        return this._fire_event(this.onsub, obj, e);
    };
    // [component.event.del:basicaction]
    _pTreeView._on_basic_ondel = function (obj, e)
    {
    };
    // [component.event.del:defaultaction]
    _pTreeView._on_default_ondel = function (obj, e)
    {
    };
    // [component.event.del:fireevent]
    _pTreeView._on_fire_ondel = function (obj, e)
    {
        return this._fire_event(this.ondel, obj, e);
    };

    /*
    // [component.mouseevent:fireevent]             // Event Override (�� ��������?)
    _pTreeView.on_fire_sys_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            // [event:eventinfo]                    // User EventInfo �ڵ�
            var evt = new nexacro.UserMouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

            return this.onmouseup._fireSysEvent(this, evt);
        }
        return false;
    };
    // [component.mouseevent:fireevent]             // Event Override (�� ��������?)
    _pTreeView.on_fire_user_onmouseup = function (button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp)
    {
        if (this.onmouseup && this.onmouseup._has_handlers)
        {
            var rootComp = this._getRootComponent(from_comp);

            // [component.eventinfo:create]         // User EventInfo �ڵ�
            var evt = new nexacro.UserMouseEventInfo(rootComp, "onmouseup", button, alt_key, ctrl_key, shift_key, screenX, screenY, canvasX, canvasY, clientX, clientY, from_comp, from_refer_comp);

            return this.onmouseup._fireUserEvent(this, evt);
        }
        return false;
    };
    */

    //===============================================================
    // nexacro._TreeView : Inner Logic
    //===============================================================



    delete _pTreeView;
};


