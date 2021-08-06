import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { path, not, prop } from 'ramda'
import LinkedReferenceParametersTable from 'components/LinkedReferenceParametersTable'
import { Loading } from 'components/chec'
import SupportParameterEditor from 'components/SupportParameterEditors/SupportParameterEditor'
import { Col, Row } from 'components/patterns'
import { getSwitchContext } from 'utils/switchData'
import ErrorBoundary from 'components/ErrorBoundary'
import strings from 'utils/strings.js'

export default SupportParameterSchematic= (props) => {
  const [spUri,setSpUri]=useState(null);

  useEffect(()=>{

    const { requestSPDetails } = props

    if (not(path(['param', 'status'], props))) {
      requestSPDetails()
    }
  },[props.param])
  

  useEffect(()=>{
    props.onUnmount()
  },[])

  useEffect(()=>{
      const {
        param,
        requestSPDetails,
        spBeingEdited,
        isEditRoute,
        setSpToEdit,
        isDuplicating,
        isLoading,
      } = props
      if (!isLoading && !isDuplicating && (!param || !param.id)) {
        requestSPDetails()
      }
      if (prop('id', param) && isEditRoute && !spBeingEdited) {
        setSpToEdit()
      }
  })
  

    const {
      signals,
      param,
      linkedRPs,
      currentSPUri,
      onDuplicate,
      onEdit,
      onCancel,
      onSave,
      siblingSPs,
    } = props

    return !param ? (
      <Loading />
    ) : (
      <ErrorBoundary
        signal={[signals.getSupportParam, signals.duplicateSupportParameter]}
      >
        <Row>
          <Col span={24}>
            <SupportParameterEditor
              param={param}
              siblingSPs={siblingSPs}
              currentSPUri={currentSPUri}
              onDuplicate={onDuplicate}
              onEdit={onEdit}
              onCancel={onCancel}
              onSave={onSave}
              switchContext={
                linkedRPs && linkedRPs[0]
                  ? getSwitchContext(
                      linkedRPs[0].refParameterNumber,
                      linkedRPs[0].release
                    )
                  : 'smartPlex'
              }
              linkedRPs={linkedRPs}
            />
          </Col>
          <Col span={24}>
            <div className="sp-schematic_reference-parameters">
              <span className="sp-schematic_linked-params-table-caption">
                {strings.rps_in_use}
              </span>
              <ErrorBoundary signal={signals.getLinkedRPs}>
                <LinkedReferenceParametersTable dataSource={linkedRPs} />
              </ErrorBoundary>
            </div>
          </Col>
        </Row>
      </ErrorBoundary>
    )
}

SupportParameterSchematic.propTypes = {
  param: PropTypes.object,
  spBeingEdited: PropTypes.object,
  signals: PropTypes.object,
  isEditRoute: PropTypes.bool,
  isDuplicating: PropTypes.bool,
  isLoading: PropTypes.bool,
  linkedRPs: PropTypes.array,
  siblingSPs: PropTypes.array,
  currentSPUri: PropTypes.string,
  requestSPDetails: PropTypes.func,
  setSpToEdit: PropTypes.func,
  onDuplicate: PropTypes.func,
  onEdit: PropTypes.func,
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  onUnmount: PropTypes.func,
}
